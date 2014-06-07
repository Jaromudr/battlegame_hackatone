import tornado.ioloop
import tornado.web

users = {}
pending_games = []
games = []

class User(object):
    def __init__(self, nickname):
        self.nickname = nickname


class Game(object):
    def __init__(self, hero):
        self.hero = hero

    def addOpponent(self, opponent):
        self.opponent = opponent

    def start(self, opponent):
        pass


class UsersHanler(tornado.web.RequestHandler):
    def get(self):
        self.write(users)


class JoinHendler(tornado.web.RequestHandler):
    def post(self):
        nickname = self.get_argument("nickname", None)

        if not nickname:
            raise web.HTTPError(417, u'Data passed is not correct')

        if nickname in users:
            raise web.HTTPError(406, u'User with nick %s already online: %s' % nickname)

        else:
            user = User(nickname)

            if pending_games:
                game = pending_games[0]
                pending_games[0].addOpponent(user)
                pedning_games.remove(game)

                games.append(game)
                game.start()

            else:
                game = Game(user)

            self.write({
                "status": game.status
            })

class GameHandler(tornado.web.RequestHandler):
    pass


application = tornado.web.Application([
    (r"/users", UsersHanler),
    (r"/user/join", JoinHendler),
    (r"/game/", GameHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()