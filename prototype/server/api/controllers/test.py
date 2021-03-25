from flask import Blueprint

test = Blueprint("test", __name__)  # initialize blueprint


# function that is called when you visit /
@test.route("/")
def index():
    return "Success" 