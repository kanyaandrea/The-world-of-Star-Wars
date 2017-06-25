from flask import Flask, redirect, url_for, request, render_template
import login
import db_connection
from login import fetch_data, fetch_data_title
#from flask_restful import Resource, Api
#import os
#import sys


app = Flask(__name__)
#api = Api(app)


@app.route('/')
def homepage():
    title = "Planets of Star Wars Universe"
    tabletitle = ["Name", "Diameter (km)", "Climate", "Terrain", "Surface water (%)", "Population"]
    return render_template("index.html", title=title, tabletitle=tabletitle)


@app.route('/login')
def loginpage():
    title = "Login"
    return render_template("login.html", title=title)


@app.route('/set_cookie')
def cookie_insertion():
    redirect_to_index = redirect('/index')
    response = current_app.make_response(redirect_to_index)
    response.set_cookie('cookie_name', value='values')
    return response


@app.route("/users")
def get_users():
    users = fetch_data(login.select_users(db_connection.connection()))
    # users_title = fetch_data_title(queries.select_mentors(db_connection.connection()))
    return render_template("general.html", table=users, tabletitle="Users", title="Registrated users")


'''if __name__ == "__main__":
    app.run(debug=True)'''
