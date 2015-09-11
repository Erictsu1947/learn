#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-09-05 17:27:03
# @Last Modified by:   anchen
# @Last Modified time: 2015-09-11 15:23:58
import os
import re
from datetime import datetime
from PIL import Image
from . import app,db
from flask import render_template, request, url_for,flash
from .forms import AvatarForm
from flask import redirect,request
from .models import ImgFile
from flask.ext.wtf import Form
from wtforms import FileField,TextAreaField,SubmitField
from wtforms.validators import DataRequired
from werkzeug import secure_filename
from flask import send_from_directory


UPLOAD_FOLDER = 'd:\\learn\\test\\app\\static\\img'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

class UploadForm(Form):
    image = FileField(u'Image File')
    description  = TextAreaField(u'Image Description',validators=[DataRequired()])
    submit = SubmitField(u'确认上传')


@app.route('/',methods=['GET','POST'])
@app.route('/index', methods = ['GET', 'POST'])
def index():
    page=request.args.get('page',1,type=int)
    pagination = ImgFile.query.order_by(ImgFile.filename.desc()).paginate(
    page, per_page=app.config['FLASKY_POSTS_PER_PAGE'],
    error_out=False)
    posts = pagination.items
    names=[]
    for i in posts:
        names.append(i.filename)
    return render_template('index.html',names=names,pagination=pagination)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    form = UploadForm(request.form)
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            img=ImgFile(filename=filename)
            db.session.add(img)
            db.session.commit()
            flash(u'文件上传成功')
            return redirect(url_for('upload_file'))
    return render_template('forms.html',form=form)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route('/img')
def img():
    return render_template('img.html')



@app.route('/user/<username>')
def userhome(username):
    return render_template('userhome.html',name=username)



@app.route('/account/avatar', methods=['GET', 'POST'])
def avatar():
    form = AvatarForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            safe_filename = safefilename(form.avatar_url.data.filename)
            # create directory
            upload_url = mkdir(app.config['UPLOADDIR'])
            avatar_path = mkdir(os.path.join(upload_url, 'avatar'))
            size150_path = mkdirbysize(avatar_path, size=150)
            date150_path, date_dir = mkdirbydate(size150_path)
            avatar_url_sql = os.path.join(date_dir, safe_filename)
            im = rim = crop150 = None
            try:
                im = Image.open(form.avatar_url.data)
                width, height = im.size
                nwidth, nheight = thumbnail(width, height, 500.0)
                rim = im.resize((nwidth, nheight), Image.ANTIALIAS)
                logger.info('picture {}, {} has been resize to {} {}'.format(width, height, nwidth, nheight))
                size = (int(form.data.get('x1')), int(form.data.get('y1')), int(form.data.get('x2')), int(form.data.get('y2')))
                crop150 = rim.crop(size).resize((150, 150), Image.ANTIALIAS)
                logger.info('picture has been crop')
                crop150.save(os.path.join(date150_path, safe_filename))
                logger.info('picture has upload successful')
                flash(u'上传头像成功', category='success')
            except:
                logger.error('picture crop and save error')
                flash(u'上传头像失败', category='error')
            finally:
                if crop150:
                    crop150.close()
                if rim:
                    rim.close()
                if im:
                    im.close()
    template_name_or_list = 'account/avatar.html'
    return render_template(**locals())