import json
import tornado.ioloop
import tornado.web
from uuid import uuid4

users = {}
pending_games = []
games = []

def find_game_by_id(id):
    for game in games:
        if game.id == id:
            return game
    return None



class User(object):
    def __init__(self, nickname):
        self.nickname = nickname

    def __repr__(self):
        return json.dumps({"nickname": self.nickname})


class Game(object):
    def __init__(self, hero):
        self.hero = hero
        self.status = "pending"
        self.game_id = str(uuid4().fields[-1])

    def addOpponent(self, opponent):
        self.opponent = opponent

    def start(self):
        self.status = "started"


class UsersHanler(tornado.web.RequestHandler):
    def get(self):
        self.write(json.dumps(users))


class JoinHendler(tornado.web.RequestHandler):
    def post(self):
        nickname = self.get_argument("nickname", None)

        if not nickname:
            raise tornado.web.HTTPError(417, u'Data passed is not correct')

        if nickname in users:
            raise tornado.web.HTTPError(406, u'User with nick %s already online' % nickname)

        else:
            user = User(nickname)

            if pending_games:
                game = pending_games[0]
                pending_games[0].addOpponent(user)
                pending_games.remove(game)

                games.append(game)
                game.start()

            else:
                game = Game(user)
                pending_games.append(game)

            users[nickname] = user

            self.write({
                "status": game.status,
                "gameId": game.game_id
            })

class GameStatus(tornado.web.RequestHandler):
    def get(self, id):
        game = find_game_by_id(id)

        self.write({
                "status": game.status
            })

application = tornado.web.Application([
    (r"/users", UsersHanler),
    (r"/user/join", JoinHendler),
    (r"/game/([^/]+)/status", GameStatus),
], debug=True)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()