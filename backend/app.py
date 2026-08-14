from flask import Flask, jsonify
from flask_cors import CORS

from sheets_client import get_order_by_id


app = Flask(__name__)

CORS(app)


@app.get("/")
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Northstar backend is running"
    }), 200



@app.get("/api/orders/<order_id>")
def order_status(order_id):
    """
    Return order status details by order ID.
    """

    order_id = order_id.strip()

    if not order_id:
        return jsonify({
            "error": "Order ID is required"
        }), 400

    try:
        order = get_order_by_id(order_id)

        if not order:
            return jsonify({
                "error": "Order not found"
            }), 404

        return jsonify(order), 200

    except Exception as error:
        print(error)

        return jsonify({
            "error": "Unable to retrieve order data"
        }), 500



if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
