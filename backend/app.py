from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app)


@app.get("/")
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Northstar backend is running"
    }), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
