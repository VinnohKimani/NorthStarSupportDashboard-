# Backend Requirements

## Purpose

The backend script connects the customer-facing dashboard to the Google Sheets prototype database.

It receives customer requests, searches the appropriate Google Sheets data, and returns the information required by the frontend.

---

# 1. Order Status

## Input

The backend receives:

- `order_id`

Example:

`NS1001`

## Process

1. Receive the Order ID.
2. Search the Orders sheet.
3. Find the matching `order_id`.
4. Retrieve the order status.
5. Retrieve the latest update.
6. Retrieve the expected delivery date.
7. Return the result to the frontend.

## Required Output

The backend should return:

- Order ID
- Product name
- Current status
- Latest update
- Expected delivery date

### Example

```json
{
  "order_id": "NS1001",
  "product_name": "Nike Air Max 270",
  "status": "In Transit",
  "last_update": "Left Nairobi distribution centre",
  "expected_delivery": "2026-08-15"
}

Invalid Order
If the Order ID does not exist, the backend should return a clear error indicating that the order could not be found.

2. Stock Availability

Input
The backend receives:
Product
Size/variation
Example:
Product: Nike Air Max 270
Size: 42
Process
Receive the product and size.
Search the Products sheet.
Find the matching product and size.
Retrieve the stock quantity.
Retrieve the availability status.
Retrieve the restock date where applicable.
Return the result to the frontend.

Required Output

The backend should return:

Product name
Size/variation
Stock quantity
Availability
Restock date where applicable
Example
{
  "product_name": "Nike Air Max 270",
  "size": "42",
  "stock_quantity": 8,
  "availability": "Available",
  "restock_date": null
}
Unavailable Product/Size
If the requested product/size is unavailable, the backend should return:
Availability status
Restock date where available

Error Handling
The backend should provide clear responses when:
Order ID does not exist.
Product does not exist.
Product/size combination does not exist.
Required input is missing.

System Flow

Customer
↓
Dashboard
↓
Backend Script
↓
Google Sheets
↓
Backend processes data
↓
Dashboard receives response
↓
Customer sees answer