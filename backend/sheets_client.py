import os

import gspread
from dotenv import load_dotenv
from google.oauth2.service_account import Credentials

load_dotenv()


def get_orders_sheet():
    """Connect to Google Sheets and return the Orders worksheet."""

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

    return spreadsheet.worksheet("Orders")


def get_order_by_id(order_id):
    """
    Find an order by order_id and return required order details.
    """

    sheet = get_orders_sheet()

    orders = sheet.get_all_records()

    for order in orders:
        if order["order_id"] == order_id:
            return {
                "order_id": order["order_id"],
                "product_name": order["product_name"],
                "status": order["status"],
                "last_update": order["last_update"],
                "expected_delivery": order["expected_delivery"],
            }

    return None
