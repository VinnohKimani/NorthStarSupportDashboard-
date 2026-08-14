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
