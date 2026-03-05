how to test backend:

clone the repo: https://github.com/jiem01/quiz5

cd backend

python -m venv venv

pip install -r requirements.txt

cd myproject

python manage.py runserver

test the endpoints in postman:

SIGNUP:

POST
http://127.0.0.1:8000/api/v1/auth/signup/
{
  "username": "user1",
  "password": "password123"
}

SIGNIN:

POST
http://127.0.0.1:8000/api/v1/auth/signin/
{
  "username": "user1",
  "password": "password123"
}

CONVERSATION:

POST
http://127.0.0.1:8000/api/v1/conversation/
{
  "title": "title ko to",
  "content": "message ko to"
}

GET
http://127.0.0.1:8000/api/v1/conversations/

GET
http://127.0.0.1:8000/api/v1/conversations/1/
