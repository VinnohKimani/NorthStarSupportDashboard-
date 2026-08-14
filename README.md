# Northstar Support Deflection Dashboard (MVP)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

A 1-week sprint self-service prototype for Northstar Retail Co. designed to deflect repetitive customer support inquiries (Order Status and Stock Availability) before they reach support agents.

> **Program/Organization:** Power Learn Project (PLP) 


---

## 🏗️ High-Level Architecture Overview

The application follows a decoupled client-server architecture. The React frontend handles user interactions and routing, making RESTful API calls to the Flask backend. The backend interfaces with the Google Sheets API, acting as our MVP database, to fetch and return real-time data.

```text
+-----------------------+           +-----------------------+           +-------------------------+
|                       |           |                       |           |                         |
|    React Frontend     |           |     Flask REST API    |           |    Google Sheets DB     |
|    (Vite / HTML /     |  HTTP/    |    (Python / gspread  |  Google   |    (Order & Inventory   |
|     CSS / JS)         |  JSON     |     / Flask-CORS)     |  Sheets   |      Data Store)        |
|                       | <-------> |                       | <-------> |                         |
|  - Order Lookup UI    |           |  - /api/orders/<id>   |   API     |  - Orders Worksheet     |
|  - Stock Search UI    |           |  - /api/stock/<id>    |           |  - Inventory Worksheet  |
|                       |           |                       |           |                         |
+-----------------------+           +-----------------------+           +-------------------------+
```

## 🎯 Key Problem Statements & Deflection Strategy

**Problem:** Customer support agents are overwhelmed by high volumes of low-complexity, repetitive inquiries, specifically regarding order statuses and product stock availability. This increases wait times for critical issues and reduces overall agent efficiency.

**Strategy (Deflection):** Implement a customer-facing, self-service dashboard that empowers users to independently resolve these common queries.
1. **Order Deflection:** Provide a frictionless lookup tool where customers can track their order placement date, transit progress, and expected delivery date without agent intervention.
2. **Stock Deflection:** Allow customers to verify real-time stock levels and view expected restock dates for out-of-stock items, preventing "Is this in stock?" emails and calls.

## 📁 Monorepo Directory Structure Tree

The project utilizes a monorepo structure to keep frontend and backend code tightly coupled for this MVP, while maintaining logical separation.

```text
.
├── backend/                  # Python Flask REST API
│   ├── app.py                # Main application entry point
│   ├── Pipfile               # Pipenv dependency definitions
│   ├── Pipfile.lock          # Locked dependency versions
│   └── .env.example          # Example environment variables
├── frontend/                 # React.js (Vite) Application
│   ├── src/                  # React source code (components, pages)
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies and scripts
│   └── vite.config.js        # Vite configuration
└── docs/                     # Project documentation (if applicable)
```

## 🚀 Setup & Installation Guide

### Backend Setup (Flask / Pipenv)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install Pipenv (if not already installed):**
   ```bash
   pip install pipenv
   ```
3. **Install dependencies:**
   ```bash
   pipenv install
   ```
4. **Activate the virtual environment:**
   ```bash
   pipenv shell
   ```
5. **Configure Environment Variables:** (See section below)
6. **Start the Flask development server:**
   ```bash
   flask run
   # OR
   python app.py
   ```
   *The API will typically run on `http://127.0.0.1:5000`.*

### Frontend Setup (React / Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # OR
   yarn install
   ```
3. **Configure Environment Variables:** (See section below)
4. **Start the Vite development server:**
   ```bash
   npm run dev
   # OR
   yarn dev
   ```
   *The frontend will typically run on `http://127.0.0.1:5173`.*

## ⚙️ Environment Variables

> [!IMPORTANT]
> Never commit your actual `.env` files or Google Service Account JSON keys to version control.

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory based on the `.env.example`:

```env
# backend/.env
FLASK_APP=app.py
FLASK_ENV=development
# Path to your Google Service Account JSON key file
GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service_account_key.json"
# The ID of your Google Sheet (from the URL)
SPREADSHEET_ID="your_google_spreadsheet_id"
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory:

```env
# frontend/.env
# URL of your Flask backend API
VITE_API_BASE_URL="http://127.0.0.1:5000/api"
```

## 🤝 Contribution & Commit Standards

We maintain a clean and readable commit history. Please adhere to the following standards when contributing.

### Branching Strategy
- `main`: Production-ready code.
- `dev`: Active development branch.
- Feature branches: Created from `dev` and named descriptively (e.g., `feature/order-lookup`, `fix/cors-issue`).

### Commit Format Rule

All commits must follow this strict format:
`type: what changed - why it matters`

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Examples:**
- `feat: implement order status lookup endpoint - allows frontend to fetch order data`
- `fix: resolve CORS policy error - enables frontend to communicate with backend`
- `style: update button hover states - improves UX and aligns with brand guidelines`

## 📋 24-Task Delivery Matrix

| Task # | Module | Task Name | Priority | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Planning | Define MVP Scope & Requirements | High | ✅ Done |
| 2 | Setup | Initialize GitHub Monorepo | High | ✅ Done |
| 3 | DB Setup | Create Google Sheets Data Store | High | ✅ Done |
| 4 | DB Setup | Configure Google Service Account & APIs | High | ✅ Done |
| 5 | Backend | Initialize Flask Project & Pipenv | High | ✅ Done |
| 6 | Frontend | Initialize Vite React Project | High | ✅ Done |
| 7 | Backend | Implement Google Sheets Connection (`gspread`) | High | ✅ Done |
| 8 | Backend | Create Order Status API Endpoint (`/api/orders/<id>`) | High | ✅ Done |
| 9 | Backend | Create Stock Search API Endpoint (`/api/stock`) | High | ✅ Done |
| 10 | Backend | Implement API Error Handling (404, 400, 500) | Medium | ✅ Done |
| 11 | Backend | Configure Flask-CORS | High | ✅ Done |
| 12 | Frontend | Create website homepage | High | ⏳ Pending |
| 13 | Frontend | Create Order Status page | High | ⏳ Pending |
| 14 | Frontend | Create Stock Availability page | High | ⏳ Pending |
| 15 | Frontend | Design navigation between pages | Medium | ⏳ Pending |
| 16 | Integration | Connect Order page to backend | High | ✅ Done |
| 17 | Integration | Connect Stock page to backend | High | ✅ Done |
| 18 | Integration | Display order results | High | ✅ Done |
| 19 | Integration | Display stock results | High | ✅ Done |
| 20 | Styling | Improve UI/readability | Medium | ⏳ Pending |
| 21 | Testing | Manual End-to-End Testing (Order Flow) | High | ⏳ Pending |
| 22 | Testing | Manual End-to-End Testing (Stock Flow) | High | ⏳ Pending |
| 23 | Docs | Complete Project README.md | Low | ⏳ Pending |
| 24 | Deployment | Prepare for Deployment / Handoff | Low | ⏳ Pending |


