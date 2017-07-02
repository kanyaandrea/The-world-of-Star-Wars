import personal_connection_config
import psycopg2
import os
import urllib

def connection():
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        connection = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        conn.autocommit = True
        cursor = conn.cursor()
        return cursor
    except psycopg2.DatabaseError as e:
        print('Cannot connect to the database.')
        print(e)
    """finally:
        if conn:
            conn.close()"""


def run_query(query):
    cursor = connection()
    cursor.execute(query)
    if "SELECT" in query:
        query_list = cursor.fetchall()
        return query_list
