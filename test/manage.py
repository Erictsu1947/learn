from app import app,db
from app.models import Role,User,ImgFile
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager,Shell

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

def make_shell_context():
    return dict(app=app, db=db, User=User, Role=Role,ImgFile=ImgFile)
manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()