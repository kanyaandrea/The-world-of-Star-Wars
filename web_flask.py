from flask import Flask, redirect, url_for, request, render_template
#from flask_restful import Resource, Api
#import os
#import sys


app = Flask(__name__)
#api = Api(app)


@app.route('/')
def homepage():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)

