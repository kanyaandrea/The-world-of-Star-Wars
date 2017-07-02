from flask import Flask, redirect, url_for, request, render_template, session, escape
import login
import db_connection
from login import fetch_data, fetch_data_title
#from flask_restful import Resource, Api
#import os
#import sys


app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.route('/')
def homepage():
    title = "Planets of Star Wars Universe"
    tabletitle = ["Name", "Diameter", "Climate", "Terrain", "Surface water (%)", "Population", "Residents"]
    modaltabletitle = ["Name", "Height", "Mass", "Skin color", "Hair Color", "Eye Color", "Birth Year", "Gender"]
    return render_template("index.html", title=title, tabletitle=tabletitle, modaltabletitle=modaltabletitle)



@app.route('/set_cookie')
def cookie_insertion():
    redirect_to_index = redirect('/')
    response = current_app.make_response(redirect_to_index)
    response.set_cookie('cookie_name', value='values')
    return response


@app.route("/users")
def get_users():
    users = fetch_data(login.select_users(db_connection.connection()))
    # users_title = fetch_data_title(queries.select_mentors(db_connection.connection()))
    return render_template("general.html", table=users, tabletitle="Users", title="Registrated users")


@app.errorhandler(404)
def page_not_found(e):
    title = "404 - This page not found"
    return render_template('error.html', title=title), 404


@app.errorhandler(405)
def page_not_found(e):
    title = "405 - This page not found"
    return render_template('error.html', title=title), 405


@app.errorhandler(500)
def internal_server_error(error):
    title = "500 - Internal server error"
    return render_template('error.html', title=title), 50


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = (username, password)
        login.add_new_user(user)
        return redirect(url_for('index'))
    return render_template('registration.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

