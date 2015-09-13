import sae
import os
import sys

app_root = os.path.dirname(__file__) 
sys.path.insert(0, os.path.join(app_root, 'site-packages')) 

def app(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return ['Hello, world!']

from manage import app

application = sae.create_wsgi_app(app)

