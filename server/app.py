import json
import tornado.ioloop
import tornado.web
from uuid import uuid4

users = {}
pending_games = []
games = []

def find_game_by_id(id):
    for game in games:
        if game.game_id == id:
            return game

    for game in pending_games:
        if game.game_id == id:
            return game

    return None



class User(object):
    def __init__(self, nickname):
        self.nickname = nickname
        self.user_id = str(uuid4().fields[-1])

    def __repr__(self):
        return json.dumps({"nickname": self.nickname})


class Game(object):
    def __init__(self, hero):
        self.hero = hero
        self.opponent = None
        self.status = "pending"
        self.game_id = str(uuid4().fields[-1])

        self.active_user = self.hero

    def add_opponent(self, opponent):
        self.opponent = opponent

    def get_opponent_id(self, user_id):
        if not self.opponent:
            return None
        else:
            if self.opponent.user_id == user_id:
                return self.hero.user_id
            else:
                return self.opponent.user_id

    def start(self):
        self.status = "started"


class UsersHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(json.dumps(users))


class JoinHandler(tornado.web.RequestHandler):
    def post(self):
        nickname = self.get_argument("nickname", None)

        if not nickname:
            raise tornado.web.HTTPError(417, message = u'Data passed is not correct')

        if nickname in users:
            raise tornado.web.HTTPError(406, message = u'User with nick %s already online' % nickname)

        else:
            user = User(nickname)

            if pending_games:
                game = pending_games[0]
                pending_games[0].add_opponent(user)
                pending_games.remove(game)

                games.append(game)
                game.start()

            else:
                game = Game(user)
                pending_games.append(game)

            users[nickname] = user

            self.write({
                "status": game.status,
                "gameId": game.game_id,
                "userId": user.user_id,
                "opponentId": game.get_opponent_id(user.user_id)
            })

class GameStatusHandler(tornado.web.RequestHandler):
    def get(self, id):
        game = find_game_by_id(id)

        self.write({
                "status": game.status,
                "userId": game.hero.user_id,
                "opponentId": game.get_opponent_id(game.hero.user_id)
            })

class IsMyStepHandler(tornado.web.RequestHandler):
    def get(self, game_id, user_id):
        game = find_game_by_id(game_id)
        is_my_step = "no"

        if game.active_user.user_id == user_id:
            is_my_step = "yes"

        self.write({
                "answer": is_my_step
            })


application = tornado.web.Application([
    (r"/users", UsersHandler),
    (r"/user/join", JoinHandler),
    (r"/game/([^/]+)/status", GameStatusHandler),
    (r"/game/([^/]+)/is-my-step/([^/]+)", IsMyStepHandler),

], debug=True)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()