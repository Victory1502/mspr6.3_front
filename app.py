
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app= Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True, port=5000)
    
    
