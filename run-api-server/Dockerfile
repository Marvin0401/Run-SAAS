FROM python:3.9.6-buster

RUN python3 -m venv venv
RUN chmod +x ./venv/bin/activate && ./venv/bin/activate
RUN pip install \
    pipreqs \
    django-cors-headers \
    django-oauth-toolkit \
    pymysql \
    mysqlclient \
    Pillow \
    djangorestframework_simplejwt

RUN pip3 install \
    djangorestframework \
    mysql-connector-python

COPY . .

RUN pip install -r requirements.txt
