#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-09-05 19:15:58
# @Last Modified by:   anchen
# @Last Modified time: 2015-09-11 15:58:27
import os

class Config(object):
    DEBUG = True
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    APPDIR = os.path.join(BASEDIR, 'app')
    STATICDIR = os.path.join(APPDIR, 'static')
    UPLOADDIR = os.path.join(STATICDIR, 'upload')
    SECRET_KEY = 'you-will-never-guess'
    CSRF_ENABLED = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_RECORD_QUERIES = True
    FLASKY_POSTS_PER_PAGE = 9
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/insight?charset=utf8'
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASSWD = '123456'
    DB_DATABASE = 'insight'
    DB_PORT = 3306
    DB_CHARSET = 'utf8'
    UPLOAD_FOLDER = 'd:\\learn\\test\\app\\static\\img'
    

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}