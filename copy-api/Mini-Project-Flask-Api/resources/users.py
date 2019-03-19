from flask import json, Blueprint, abort, make_response
from flask_restful import (Resource, Api, reqparse, fields, marshal, marshal_with, url_for)
from flask_login import login_required, login_user, logout_user
from flask_bcrypt import check_password_hash

import models

user_fields = {
	'id': fields.Integer,
	'username': fields.String
}


class UserRegister(Resource):
	def __init__(self):
		self.reqparse = reqparse.RequestParser()
		self.reqparse.add_argument(
            'username',
            required=True,
            help="No Username Provided",
            location=['form', 'json']
            )
		self.reqparse.add_argument(
            'password',
            required=True,
            help="No Password Provided",
            location=['form', 'json']
            )
		self.reqparse.add_argument(
            'verify_password',
            required=True,
            help="No Password Verification Provided",
            location=['form', 'json']
            )

		super().__init__()


	# Post route for user registration
	def post(self):
		""" Post route functionality when the user is registering his information """
		args = self.reqparse.parse_args()
		print("Arguments: ", args)

		# Only if the password and verify_password entered by the user match should we create the user
		if args['password'] == args['verify_password']:
			# Create our user
			user = models.User.create_user(username=args['username'], password=args['password'])
			print("User created in post route: ", user)
			
			# If username already exists, want to throw a json error
			if(user == 'User with that username already exists'):
				return make_response(
           				 json.dumps({
                			"error": "Username already exists. Please enter a new username"
                		}), 400
           			)

			# If user does not exist, login the user and return username
			else:
				# Login the user
				login_user(user)
				# filters the result based on the user_fields and sends json response 
				return (make_response(
					json.dumps((marshal(user, user_fields), 200))))

		# returns json error if passwords don't match 
		return make_response(
            json.dumps({
                "error": "Password and Password Verification do not match"
                }), 400
            )



class UserLogin(Resource):
	def __init__(self):
		self.reqparse = reqparse.RequestParser()
		self.reqparse.add_argument(
            'username',
            required=True,
            help="No Username Provided",
            location=['form', 'json']
            )
		self.reqparse.add_argument(
            'password',
            required=True,
            help="No Password Provided",
            location=['form', 'json']
            )
		super().__init__()

	# Post route for user login
	def post(self):
		args = self.reqparse.parse_args()
		print("Arguments from UserLogin class", args) 
		try:
			user = models.User.get(models.User.username == args['username'])
		except models.User.DoesNotExist:
			return make_response(
            json.dumps({
                "error": "User does not exist in the database. Please register an account instead."
                }), 400
            )
		else:
			# Need to check if the right password was entered
			if check_password_hash(user.password, args['password']):
				# Login the user
				login_user(user)
				print ("User found in database: ",user.username)
				return make_response(json.dumps({
					"username": user.username
					}), 200)
			else:
				return make_response(
           			 json.dumps({
                		"error": "User password was incorrectly entered. Please enter the correct password."
               		 }), 400
          		)



class UsersList(Resource):
	def __init__(self):
		self.reqparse = reqparse.RequestParser()
		self.reqparse.add_argument(
            'username',
            required=False,
            help="No Username Provided",
            location=['form', 'json']
            )

		super().__init__()


	# Get route for all users
	def get(self, value):
		print("Value is: ", value);
		if value == 'au':
			users = [marshal(user, user_fields) for user in models.User.select()]
			return {'users': users}
		else:
			userCount = models.User.select().where(models.User.username == value).count()
			print ("User count: ", userCount)
			if(userCount == 0):
				return make_response(
           			 json.dumps({
                		"error": "No users exist with that username. Make sure you are entering the username for the person you are searching for."
               		 }), 400
          		)
			else:
				user = models.User.get(models.User.username == value)
				return marshal(user, user_fields)



	# Update route for updating user info
	def put(self, value):
		print("Current username from put route is: ", value)
		args = self.reqparse.parse_args()
		print("Arguments from Put route", args)
		try:
			user = models.User.get(models.User.username == args['username'])

		except models.User.DoesNotExist:
			query = models.User.update(username = args['username']).where(models.User.username == value)
			records = query.execute()
			print("Number of records modified: ", records)
			return make_response(
	           	json.dumps({
	           		"success": "User updated in the database."
	            }), 200
        	)
		else:
			return make_response(
				json.dumps({
                "error": "Username already exists. Please enter a new username."
                }), 400
            )



	# Delete route for deleting user:
	def delete(self, value):
		print("Value is: ", value);
		userRecord = models.User.get(models.User.username == value)
		movies = models.Movie.select().where(models.Movie.user == userRecord)
		print("User selected to delete: ", userRecord)
		print("No of Movies to be deleted: ", movies)
		print("Name of movies to deleted: ")
		for movie in movies:
			print("Movie name deleting: ", movie.name)
			movie.delete_instance()
		print("Movies deleted")
		records = userRecord.delete_instance()
		print("Records deleted: ", records)
		return make_response(
           	 json.dumps({
           		"message": "User deleted from database."
            }), 200
        )

		




users_api = Blueprint('resources.users', __name__)
api =Api(users_api)

api.add_resource(UserRegister, '/register', endpoint='register')
api.add_resource(UserLogin, '/login', endpoint='login')
api.add_resource(UsersList, '/users/<value>', endpoint='users')