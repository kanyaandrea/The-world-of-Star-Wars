import personal_connection_config
import psycopg2


def connection():
    try:
        connect_str = personal_connection_config.my_connection()
        # use our connection values to establish a connection
        conn = psycopg2.connect(host=connect_str["host"],
                                user=connect_str["user"],
                                password=connect_str["passwd"],
                                dbname=connect_str["dbname"])
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
