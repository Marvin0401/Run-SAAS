import os
import sys

path = '/var/www/runBackend/'
if path not in sys.path:
    sys.path.insert(0, '/var/www/runBackend/')
    sys.path.append('/usr/lib/python3.6/dist-packages')
    #sys.path.append('/var/www/runBackend/runBackend')

os.environ['DJANGO_SETTINGS_MODULE'] = 'runBackend.settings'

#import django.core.handlers.wsgi
#application = django.core.handlers.wsgi.WSGIHandler()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
