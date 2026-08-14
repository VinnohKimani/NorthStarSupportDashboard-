# Data Structure

## Overview

Google Sheets is the main prototype data source for the Northstar Support Deflection Dashboard.

The MVP uses two primary datasets:

1. Orders
2. Products

The backend script will retrieve information from these datasets based on customer requests.

---

# Orders Dataset

| Field | Description |
|---|---|
| order_id | Unique identifier for an order |
| customer_name | Name of the customer |
| product_id | Identifier of the product |
| product_name | Name of the product |
| order_date | Date the order was placed |
| status | Current order status |
| last_update | Most recent order update |
| expected_delivery | Expected delivery date |

### Purpose

The Orders dataset supports the Order Status customer journey.

The backend will use `order_id` to locate the customer's order.

---

# Products Dataset

| Field | Description |
|---|---|
| product_id | Unique product identifier |
| product_name | Name of the product |
| category | Product category |
| size | Product size or variation |
| stock_quantity | Current quantity available |
| availability | Availability status |
| restock_date | Expected restock date where applicable |

### Purpose

The Products dataset supports the Stock Availability customer journey.

The backend will use the product and size/variation to determine availability.

---

# Data Source

Google Sheets is being used as the prototype database because the objective of the sprint is to demonstrate the MVP concept rather than build a production database.

The Google Sheet will act as the source of truth for the prototype data.

## Current Prototype Data

### Orders

The Orders dataset has been populated with 10 sample records for MVP testing.

The records cover different order states including:

- Processing
- Packaging
- Shipped
- In Transit
- Delivered

### Products

Product and stock records have been created covering:

- Multiple products
- Multiple sizes/variations
- Available products
- Unavailable products
- Restock dates