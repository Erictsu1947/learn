from flask.ext.login import UserMixin
from datetime import datetime
from . import db


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(64),unique=True,index=True)
    email=db.Column(db.String(64),unique=True,index=True)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __repr__(self):
        return '<Role %s>'%self.name
    
    
class User(db.Model,UserMixin):
    __tablename__ = 'users'
    id =db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(64),unique=True,index=True)
    email=db.Column(db.String(64),unique=True,index=True)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer,db.ForeignKey('roles.id'))
    
    def __repr__(self):
        return '<User %s>'%self.username

class ImgFile(db.Model):
    __tablename__ = 'imgpaths'
    id = db.Column(db.Integer,primary_key=True)
    filename = db.Column(db.String(128),unique=True,index=True)
    timestamp = db.Column(db.DateTime,index=True,default=datetime.utcnow)

    def __repr__(self):
        return '<ImgFile %s>'%self.filename

class Avatar(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    avatar_url= db.Column(db.String(120))
    update_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def __init__(self,avatar_url,update_at=None):
        self.avatar_url = avatar_url
        if update_at==None:
            update_at =datetime.utcnow()
        self.update_at = update_at

    def __repr__(self):
        return '<Avatar %r>'%self.avatar_url

    def save(self):
        db.session.add(self)
        db.session.commit()
    