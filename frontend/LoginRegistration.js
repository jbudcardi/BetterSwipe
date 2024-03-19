import re
import hashlib
import sqlite3

def create_connection():
    conn = sqlite3.connect('users.db')
    return conn

def create_table(conn):
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                     (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)''')

def validate_email(email):
    if re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return True
    return False

def validate_password(password):
    if len(password) < 10:
        return False
    if not re.search(r'\d', password):
        return False
    if not re.search(r'[A-Z]', password, re.MULTILINE):
        return False
    if not re.search(r'[a-z]', password, re.MULTILINE):
        return False
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password, re.MULTILINE):
        return False
    return True

def register(email, password):
    conn = create_connection()
    cursor = conn.cursor()
    if validate_email(email) and validate_password(password):
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, hashed_password))
        conn.commit()
        return True
    return False

def login(email, password):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    if user:
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        if user[2] == hashed_password:
            return True
    return False