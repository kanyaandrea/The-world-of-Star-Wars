import db_connection
import psycopg2
import datetime


def fetch_data(cursor):
    rows = list(cursor.fetchall())
    return rows


def fetch_data_title(cursor):
    rows = list(cursor.fetchall())
    rows_title = [row[0] for row in cursor.description]
    return rows_title


def select_allusers(cursor):
    cursor.execute(""" SELECT id, username, password
                        FROM usertable
                        ORDER BY id ASC
                        ;""")
    return cursor


def add_new_user(cursor, username, password):
    cursor.execute("""INSERT INTO usertable (username, password)
                    VALUES (%s, %s); """, (username, password))


def get_userinfo(cursor, username):
    cursor.execute("""SELECT username, password
                        FROM usertable
                        WHERE username = %s;""", (username))
    return cursor


def get_userid(cursor, username):
    cursor.execute("""SELECT id
                        FROM usertable
                        WHERE username = %s;""", (username))
    return cursor

