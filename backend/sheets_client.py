import os

import gspread
from dotenv import load_dotenv
from google.oauth2.service_account import Credentials

load_dotenv()


def get_worksheet(sheet_name):
    """Connect to Google Sheets and return the specified worksheet."""

    credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    spreadsheet_id = os.getenv("SPREADSHEET_ID")

    if not credentials_path:
        raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is not configured.")

    if not spreadsheet_id:
        raise ValueError("SPREADSHEET_ID is not configured.")

    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ]

    credentials = Credentials.from_service_account_file(
        credentials_path,
        scopes=scopes,
    )

    client = gspread.authorize(credentials)

    spreadsheet = client.open_by_key(spreadsheet_id)

    return spreadsheet.worksheet(sheet_name)


def get_order_by_id(order_id):
    """
    Find an order by order_id and return required order details.
    Handles case-insensitivity and leading/trailing spaces.
    """

    sheet = get_worksheet("Orders")
    orders = sheet.get_all_records()
    
    order_id = str(order_id).strip().lower()

    for order in orders:
        current_id = str(order.get("order_id", "")).strip().lower()
        if current_id == order_id:
            return {
                "order_id": order.get("order_id"),
                "product_name": order.get("product_name"),
                "status": order.get("status"),
                "last_update": order.get("last_update"),
                "expected_delivery": order.get("expected_delivery"),
            }

    return None


def get_stock(product_query, size_query):
    """
    Find stock availability by product name/SKU and size.
    Handles case-insensitivity.
    """
    sheet = get_worksheet("Products")
    items = sheet.get_all_records()
    
    product_query = str(product_query).strip().lower()
    size_query = str(size_query).strip().lower()
    
    product_found = False
    
    for item in items:
        name = str(item.get("product_name", "")).strip().lower()
        sku = str(item.get("sku", "")).strip().lower()
        size = str(item.get("size", "")).strip().lower()
        
        if product_query == name or product_query == sku:
            product_found = True
            if size_query == size:
                qty = item.get("quantity", 0)
                status = item.get("status", "")
                expected_restock = str(item.get("expected_restock", "")).strip()
                
                try:
                    qty = int(qty)
                except ValueError:
                    qty = 0
                
                if qty > 0:
                    status = "In Stock"
                else:
                    status = "Out of Stock"
                    if not expected_restock:
                        expected_restock = "No restock date scheduled at this time. Please check back later."
                
                return {
                    "found": True,
                    "product_name": item.get("product_name"),
                    "sku": item.get("sku"),
                    "size": item.get("size"),
                    "quantity": qty,
                    "status": status,
                    "expected_restock": expected_restock
                }
                
    if product_found:
        return {"found": False, "reason": "size_not_found"}
    else:
        return {"found": False, "reason": "product_not_found"}
