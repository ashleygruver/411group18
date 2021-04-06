import os
import json
import datetime
from flask import Flask
from flask_cors import CORS
from bson.objectid import ObjectId
from flask_pymongo import PyMongo


class JSONEncoder(json.JSONEncoder):
    """ extend json-encoder class """

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


# Objects and Instances to be used in other files are placed here
mongo = PyMongo()
app = Flask(__name__)
CORS(app, supports_credentials=True)

def create_app(test_config=False):
    """ Initializes and adds necessary information into the Flask app object """

    app.json_encoder = JSONEncoder
    app.secret_key = 'secretkey'
    configure_mongo_uri(app)  # MongoDB configuration
    register_blueprints(app)  # Registering blueprints to Flask App
    return app


def configure_mongo_uri(app):
    app.config.from_pyfile('config.py')
    app.config["MONGO_URI"] = "mongodb+srv://"+app.config["MONGO_USERNAME"] + \
        ":"+app.config["MONGO_PASSWORD"]+"@"+app.config["MONGO_HOST"]
    try:
        mongo.init_app(app)
        print("MongoDB connected.")
    except Exception as e:
        print(e)


def register_blueprints(app):
    """ Helper function to register blueprints into Flask App """
    # from api.controllers import filename here
    from api.controllers.test import test
    from api.controllers.authentication import authentication
    from api.controllers.spotify import spotify

    print("Registering Flask Blueprints.")
    app.register_blueprint(test)
    app.register_blueprint(authentication)
    app.register_blueprint(spotify)

    return app
