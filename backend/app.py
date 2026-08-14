from flask import Flask, jsonify, request
from flask_cors import CORS

from sheets_client import get_order_by_id, get_stock

app = Flask(__name__)

CORS(app)


@app.get("/")
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Northstar backend is running"
    }), 200


@app.get("/api/orders")
@app.get("/api/orders/<order_id>")
def order_status(order_id=""):
    """
    Return order status details by order ID.
    Handles empty IDs implicitly when hitting /api/orders without a parameter, 
    or when order_id is just whitespace.
    """
    order_id = order_id.strip()

    if not order_id:
        return jsonify({
            "error": "Order ID is required. Please provide a valid order ID."
        }), 400

    try:
        order = get_order_by_id(order_id)

        if not order:
            return jsonify({
                "error": "Order not found. Please check your confirmation email or receipt to ensure the Order ID is correct."
            }), 404

        return jsonify(order), 200

    except Exception as error:
        print(error)
        return jsonify({
            "error": "Unable to retrieve order data"
        }), 500


@app.get("/api/stock")
def stock_status():
    """
    Return stock availability by product name/SKU and size.
    """
    product = request.args.get("product", "").strip()
    size = request.args.get("size", "").strip()
    
    if not product or not size:
        return jsonify({
            "error": "Both 'product' and 'size' parameters are required."
        }), 400
        
    try:
        stock_info = get_stock(product, size)
        
        if not stock_info["found"]:
            if stock_info["reason"] == "product_not_found":
                return jsonify({
                    "error": "Product not found in our catalog. Please verify the product name or SKU."
                }), 404
            elif stock_info["reason"] == "size_not_found":
                return jsonify({
                    "error": "Product exists, but the specified size is not available."
                }), 404
                
        # Remove internal 'found' flag before returning
        stock_info.pop("found", None)
        return jsonify(stock_info), 200
        
    except Exception as error:
        print(error)
        return jsonify({
            "error": "Unable to retrieve stock data"
        }), 500


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
