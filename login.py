import db_connection
import psycopg2


def fetch_data(cursor):
    rows = list(cursor.fetchall())
    return rows


def fetch_data_title(cursor):
    rows = list(cursor.fetchall())
    rows_title = [row[0] for row in cursor.description]
    return rows_title


def select_users(cursor):
    cursor.execute(""" SELECT id, username, password
                        FROM usertable
                        ORDER BY id ASC
                        ;""")
    return cursor

