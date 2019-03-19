import datetime

from peewee import *
from flask import json, make_response
from flask_bcrypt import generate_password_hash
from flask_login import UserMixin

DATABASE = SqliteDatabase('moviedatabase.sqlite')


class User(UserMixin, Model):
	username = CharField(unique=True)
	password = CharField()

	class Meta:
		database = DATABASE


	@classmethod
	def create_user(cls, username, password):
		try:
			cls.select().where(cls.username == username).get()
		except cls.DoesNotExist:
			user = cls(username=username)
			user.password = generate_password_hash(password)
			user.save()
			return user
		else:
			return "User with that username already exists"
			# raise Exception("User with that email or username already Exists")
			


class Movie(Model):
	name = CharField(unique=True)
	description = TextField()
	timestamp = DateTimeField(default = datetime.datetime.now)
	user = ForeignKeyField(
		model = User,
		backref = 'posts')

	class Meta:
		database = DATABASE
		order_by = ['-timestamp']



def initialize():
	DATABASE.connect()
	DATABASE.create_tables([User, Movie], safe=True)
	DATABASE.close()

