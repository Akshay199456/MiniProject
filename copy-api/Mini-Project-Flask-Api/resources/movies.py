from flask import json, Blueprint, abort, make_response
from flask_restful import (Resource, Api, reqparse, fields, marshal, marshal_with, url_for)
from flask_login import current_user

import models

user_fields = {
	'id': fields.Integer,
	'username': fields.String
}

movie_fields = {
	'id': fields.Integer,
	'name': fields.String,
	'description': fields.String,
	'user': fields.Nested(user_fields)
}


class MovieList(Resource):
	def __init__(self):
		self.reqparse = reqparse.RequestParser()
		self.reqparse.add_argument(
            'name',
            required=True,
            help="No Description Provided",
            location=['form', 'json']
            )
		self.reqparse.add_argument(
            'description',
            required=True,
            help="No Description Provided",
            location=['form', 'json']
            )

		super().__init__()


	def get(self):
		""" Get function for getting all movies """
		movies = [marshal(movie, movie_fields) for movie in models.Movie.select()]
		return {'movies': movies}


	def post(self):
		""" Post function for adding movie to the database """
		print("Post route reached")
		args = self.reqparse.parse_args()
		print("Arguments from movies resource: ", args)
		# print("Current User: ", current_user.id)
		try:
			movie = models.Movie.get( models.Movie.name == args['name'])

		except models.Movie.DoesNotExist: 
			print("Current User object: ", current_user._get_current_object())
			models.Movie.create(name=args['name'], description=args['description'], user=current_user._get_current_object())
			return make_response(
				json.dumps({
					"success": "Movie was added to the database."
					}), 200
				)
		else:
			return make_response(
				json.dumps({
					"error": "Movie already exists in the database. Enter a new movie."
					}), 400
				)



class Movie(Resource):
	def __init__(self):
		self.reqparse = reqparse.RequestParser()
		self.reqparse.add_argument(
            'name',
            required=True,
            help="No Description Provided",
            location=['form', 'json']
            )
		self.reqparse.add_argument(
            'description',
            required=True,
            help="No Description Provided",
            location=['form', 'json']
            )
		super().__init__()

	def get(self, id):
		""" Get function to view a particular movie """
		print("Show route for movie hit!")
		print("Id of movie to view: ", id)
		movie = models.Movie.get(models.Movie.id == id)
		print("Movie to view: ", movie.name)
		return{'movie': marshal(movie, movie_fields)}

	def put(self, id):
		""" Put function to edit movie """
		print("Edit route for movie hit!")
		print("Id of movie to update: ", id)
		args = self.reqparse.parse_args()
		print("Arguments from put route: ", args)
		try:
			movie = models.Movie.get(models.Movie.name == args['name'])

		except models.Movie.DoesNotExist:
			query = models.Movie.update(name = args['name'], description = args['description']).where(models.Movie.id == id)
			records = query.execute()
			print("Number of records modified: ", records)
			return make_response(
	           	json.dumps({
	           		"success": "Movie updated in the database."
	            }), 200
        	)
		else:
			return make_response(
				json.dumps({
					"error": "Movie already exists in the database. Please enter a new movie name instead"
					}), 400
				)




	def delete(self, id):
		""" Delete function for deleting movie from the database """
		print("We hitting the delete movie route");
		print("Id of movie to delete: ", id)
		print("Type of id: ", type(id))
		movie = models.Movie.get(models.Movie.id == id)
		print("Movie selected to delete: ", movie.name)
		records = movie.delete_instance()
		print("Records deleted: ", records)
		return make_response(
           	 json.dumps({
           		"success": "Movie deleted from database."
            }), 200
        )






movies_api = Blueprint('resources.movies', __name__)
api =Api(movies_api)

api.add_resource(MovieList, '/movies', endpoint='movies')
api.add_resource(Movie, '/movies/<int:id>', endpoint='movie')

