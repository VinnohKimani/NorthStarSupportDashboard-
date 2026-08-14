# Customer Journeys

## 1. Order Status Journey

### Customer Goal

The customer wants to know where their order is and when it is expected to arrive.

### Journey

1. Customer opens the Northstar Support Deflection Dashboard.
2. Customer selects "Order Status".
3. Customer enters their Order ID.
4. The website sends the Order ID to the backend.
5. The backend searches the Orders data in Google Sheets.
6. The backend retrieves the matching order information.
7. The backend returns the result to the website.
8. The website displays the current order status.
9. The website displays the latest update.
10. The website displays the expected delivery date.
11. The customer gets the information without contacting a support agent.

### Example

Customer enters:

NS1001

The system returns:

- Status: In Transit
- Latest Update: Left Nairobi distribution centre
- Expected Delivery: 15 August 2026

---

## 2. Stock Availability Journey

### Customer Goal

The customer wants to know whether a specific product and size is available.

### Journey

1. Customer opens the Northstar Support Deflection Dashboard.
2. Customer selects "Stock Availability".
3. Customer searches for a product.
4. Customer selects the required size or variation.
5. The website sends the product and size to the backend.
6. The backend searches the Products data in Google Sheets.
7. The backend retrieves the matching product/size information.
8. The backend returns the result to the website.
9. The website displays the availability.
10. If unavailable, the website displays the expected restock date where available.
11. The customer gets the information without contacting a support agent.

### Example

Customer searches:

Nike Air Max 270

Selects:

Size 42

The system returns:

Available — 8 units in stock

---

# High-Level Flow

Customer
↓
Northstar Support Deflection Dashboard
↓
Select Support Need
↓
Enter/Search Information
↓
Backend Script
↓
Google Sheets
↓
Backend processes result
↓
Dashboard displays answer
↓
Customer gets answer