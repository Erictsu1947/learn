#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-09-05 17:27:35
# @Last Modified by:   anchen
# @Last Modified time: 2015-09-11 14:55:35
from flask.ext.wtf import Form
from flask.ext.wtf.file import FileField,FileAllowed,FileRequired
from wtforms import StringField,PasswordField,SubmitField
from wtforms.validators import DataRequired

class LoginForm(Form):
    name = StringField('What is your name?',validators=DataRequired())
    Password = PasswordField('Enter your password',validators=DataRequired())
    submit = SubmitField('Submit')

class AvatarForm(Form):
    avatar_url = FileField(u'头像图片',validators=[
        FileRequired(),
        FileAllowed(['jpg','jpeg','png'],u'只能上传jpg,jpeg,png类型图片')
        ])
    x1 = StringField(u'x1')
    y1 = StringField(u'y1')
    x2 = StringField(u'x2')
    y2 = StringField(u'y2')
    w = StringField(u'w')
    h = StringField(u'h')
