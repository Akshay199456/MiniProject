from flask import Flask, make_response, json
from flask_cors import CORS
from flask_login import LoginManager, login_required, logout_user
from resources.users import users_api
from resources.movies import movies_api

import config
import models

login_manager = LoginManager()
app = Flask(__name__)
app.secret_key = config.SECRET_KEY
login_manager.init_app(app)


@login_manager.user_loader
def load_user(userId):
	try:
		return models.User.get(userId == models.User.id)
	except models.DoesNotExist:
		return None


CORS(users_api, origins=["http://localhost:3000"], supports_credentials=True)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
CORS(movies_api, origins=["http://localhost:3000"], supports_credentials=True)


app.register_blueprint(users_api, url_prefix="/api/v1")
app.register_blueprint(movies_api, url_prefix="/api/v1")

# Code on app route

@app.route('/')
def hello_world():
	return "Hello World!"


@app.route('/logout')
def logout():
	logout_user();
	return make_response(
        json.dumps({
           	"message": "Successfully logged out"
            }), 200
        )


if __name__ == "__main__":
	models.initialize()
	app.run(debug=config.DEBUG, port=config.PORT)
