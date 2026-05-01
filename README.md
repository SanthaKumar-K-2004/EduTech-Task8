# EduTech-Task8 - RESTful API with CRUD Operations

A complete RESTful API built with Node.js and Express for managing products with full CRUD (Create, Read, Update, Delete) operations.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [HTTP Methods & Status Codes](#http-methods--status-codes)
- [Request Examples](#request-examples)
- [Postman Collection](#postman-collection)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Interview Q&A](#interview-qa)
- [Testing Guide](#testing-guide)

---

## 🎯 Project Overview

This project implements a production-ready RESTful API that demonstrates industry-standard API design principles. It handles product data management with proper HTTP status codes, error handling, validation, and query filtering.

**Key Learning Outcomes:**
- Understanding REST principles and HTTP methods
- Implementing proper HTTP status codes (200, 201, 400, 404, 500)
- Data validation and error handling
- CRUD operations in Express.js
- API documentation and testing with Postman

---

## ✨ Features

✅ **Full CRUD Operations**
- Create products with validation
- Read single and multiple products
- Update products (full and partial)
- Delete products

✅ **Advanced Features**
- Query filtering by category and price range
- Proper HTTP status codes for all scenarios
- Comprehensive error handling
- Data validation
- CORS enabled
- Consistent JSON response format

✅ **Developer Friendly**
- Clear endpoint organization
- Request/response examples
- Postman collection included
- Detailed error messages

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js (v4.18+)
- **Middleware**: CORS
- **Port**: 5000
- **Database**: In-memory (JavaScript array)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js installed on your system
- npm (Node Package Manager)
- Postman (for API testing) - [Download here](https://www.postman.com/downloads/)

### Step 1: Clone or Download the Project
```bash
cd "Task 8"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - Enable cross-origin requests

### Step 3: Start the Server
```bash
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   Product API Server Started          ║
║   🚀 Server running on:               ║
║      http://localhost:5000            ║
║                                        ║
║   Available Endpoints:                 ║
║   GET    /api/products                ║
║   GET    /api/products/:id            ║
║   POST   /api/products                ║
║   PUT    /api/products/:id            ║
║   PATCH  /api/products/:id            ║
║   DELETE /api/products/:id            ║
║   GET    /api/health                  ║
╚════════════════════════════════════════╝
```

The API is now running and ready to accept requests!

---

## 📡 API Endpoints

### 1. Get All Products
**Endpoint:** `GET /api/products`

**Description:** Retrieve all products with optional filtering

**Query Parameters:**
- `category` (optional) - Filter by product category
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "stock": 10,
      "category": "Electronics"
    }
  ],
  "count": 1
}
```

---

### 2. Get Single Product by ID
**Endpoint:** `GET /api/products/:id`

**Description:** Retrieve a specific product by its ID

**Path Parameters:**
- `id` (required) - Product ID

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 10,
    "category": "Electronics"
  }
}
```

---

### 3. Create New Product
**Endpoint:** `POST /api/products`

**Description:** Create a new product (returns 201 Created)

**Request Body:**
```json
{
  "name": "Wireless Headphones",
  "description": "Noise-cancelling Bluetooth headphones",
  "price": 149.99,
  "stock": 25,
  "category": "Electronics"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 6,
    "name": "Wireless Headphones",
    "price": 149.99,
    "stock": 25,
    "category": "Electronics"
  }
}
```

---

### 4. Update Product (Full - PUT)
**Endpoint:** `PUT /api/products/:id`

**Description:** Replace entire product

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Laptop",
    "price": 1299.99
  }
}
```

---

### 5. Update Product (Partial - PATCH)
**Endpoint:** `PATCH /api/products/:id`

**Description:** Update only specified fields

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product partially updated successfully",
  "data": {
    "id": 2,
    "price": 899.99
  }
}
```

---

### 6. Delete Product
**Endpoint:** `DELETE /api/products/:id`

**Description:** Delete a product by ID

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": 5,
    "name": "USB Cable"
  }
}
```

---

### 7. Health Check
**Endpoint:** `GET /api/health`

**Description:** Check if API is running

**Response:** 200 OK
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-05-01T10:45:00.000Z"
}
```

---

## 📊 HTTP Methods & Status Codes

| Status Code | Meaning | When Used |
|---|---|---|
| **200** | OK | Successful GET, PUT, PATCH, DELETE |
| **201** | Created | Successful POST (resource created) |
| **400** | Bad Request | Invalid input, validation failed |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Server error |

### HTTP Methods

| Method | Purpose | Idempotent | Returns |
|---|---|---|---|
| **GET** | Read data | ✅ Yes | 200 OK |
| **POST** | Create new resource | ❌ No | 201 Created |
| **PUT** | Replace entire resource | ✅ Yes | 200 OK |
| **PATCH** | Partial update | ❌ No | 200 OK |
| **DELETE** | Delete resource | ✅ Yes | 200 OK |

---

## 📝 Request Examples

### Example 1: Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Smartphone","price":599.99,"stock":50,"category":"Electronics"}'
```

### Example 2: Get Products by Category
```bash
curl http://localhost:5000/api/products?category=Electronics
```

### Example 3: Get Products in Price Range
```bash
curl http://localhost:5000/api/products?minPrice=100&maxPrice=500
```

### Example 4: Update Product Price (PATCH)
```bash
curl -X PATCH http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":899.99}'
```

### Example 5: Delete a Product
```bash
curl -X DELETE http://localhost:5000/api/products/3
```

---

## 🔵 Postman Collection

A complete Postman collection is included: **`Product_API_Postman_Collection.json`**

### How to Import & Use:

1. **Open Postman**
2. **Click:** File → Import
3. **Select:** `Product_API_Postman_Collection.json`
4. **Collection loaded** with organized endpoints

### Testing in Postman:

1. **Start the API server** - Run `npm start`
2. **Open Postman collection** - Already imported
3. **Run requests** - Click any request and hit "Send"
4. **View responses** - See formatted JSON responses

---

## 📦 Database Schema

### Product Schema
```javascript
{
  id: number,              // Auto-generated unique identifier
  name: string,            // Product name (required)
  description: string,     // Product description (optional)
  price: number,           // Product price in USD (required)
  stock: number,           // Available quantity (optional, default: 0)
  category: string,        // Product category (optional, default: "Uncategorized")
  createdAt: string,       // ISO timestamp (auto-generated on POST)
  updatedAt: string        // ISO timestamp (auto-generated on PUT/PATCH)
}
```

### Sample Products (Initial Data):
1. Laptop - $999.99 (Electronics)
2. Mouse - $29.99 (Accessories)
3. Keyboard - $79.99 (Accessories)
4. Monitor - $399.99 (Electronics)
5. USB Cable - $9.99 (Accessories)

---

## ❌ Error Handling

The API validates all inputs and returns appropriate error messages:

### Validation Errors
```json
{
  "success": false,
  "message": "Name and price are required fields",
  "data": null
}
```

### Invalid Data Types
```json
{
  "success": false,
  "message": "Price must be a positive number",
  "data": null
}
```

### Resource Not Found
```json
{
  "success": false,
  "message": "Product with ID 999 not found",
  "data": null
}
```

### Server Errors
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details here"
}
```

---

## 🎓 Interview Q&A

### Q1: What is the difference between POST and PUT?

| Aspect | POST | PUT |
|---|---|---|
| **Purpose** | Create new resource | Replace entire resource |
| **HTTP Status** | 201 Created | 200 OK |
| **Idempotent** | ❌ No | ✅ Yes |
| **Data Replacement** | Creates new entry | Replaces all fields |
| **Use Case** | `POST /api/products` | `PUT /api/products/1` |

**Real Example:**
```bash
# POST - Creates NEW product each time
POST /api/products → id: 6, 7, 8 (Three new products!)

# PUT - Replaces existing product
PUT /api/products/1 → Still replaces product 1 (same result)
```

---

### Q2: What does HTTP Status 201 mean?

**HTTP 201 = "Created"**

- **When Used:** Only when a resource is successfully created via POST request
- **Purpose:** Indicates that the request succeeded AND a new resource was created
- **Response Includes:** The newly created resource with auto-generated ID
- **Key Difference from 200:**
  - **200 OK** - Request succeeded, resource was retrieved/updated
  - **201 Created** - Request succeeded, NEW resource was created

**Example Response with 201:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 6,
    "name": "Wireless Headphones",
    "price": 149.99
  }
}
```

---

## 🧪 Testing Guide

### Method 1: Using Postman (Easiest)
1. Import the collection
2. Click any request and hit "Send"
3. View formatted JSON responses

### Method 2: Using cURL
```bash
# Get all products
curl http://localhost:5000/api/products

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":99.99}'

# Get specific product
curl http://localhost:5000/api/products/1

# Update (PATCH)
curl -X PATCH http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":799.99}'

# Delete
curl -X DELETE http://localhost:5000/api/products/1
```

### Method 3: Using Browser
1. Visit `http://localhost:5000/api/health`
2. Visit `http://localhost:5000/api/products`
3. View JSON responses

---

## 📂 Project Structure
```
Task 8/
├── server.js                              # Main API server
├── package.json                           # Node dependencies
├── Product_API_Postman_Collection.json   # Postman collection
├── README.md                              # This file
└── .gitignore                             # Git configuration
```

---

## 🚀 Features Demonstrated

✅ RESTful API design principles
✅ CRUD operations (Create, Read, Update, Delete)
✅ Proper HTTP methods and status codes
✅ Data validation and error handling
✅ Query filtering and searching
✅ Consistent JSON response format
✅ CORS support for cross-origin requests
✅ Comprehensive documentation
✅ Postman testing collection
✅ Both PUT (full) and PATCH (partial) updates

---

## 💡 Key Learning Outcomes

1. **REST Principles** - Understanding resource-based APIs
2. **HTTP Methods** - Proper use of GET, POST, PUT, PATCH, DELETE
3. **Status Codes** - Correct use of 200, 201, 400, 404, 500
4. **Validation** - Input validation and error messages
5. **CRUD Operations** - Complete create, read, update, delete functionality
6. **API Testing** - Using Postman and cURL
7. **Code Organization** - Clean, maintainable Express.js code
8. **Documentation** - Professional API documentation

---

## 📞 Troubleshooting

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**Module Not Found:**
```bash
npm install
```

**Server Won't Start:**
- Check if Node.js is installed: `node --version`
- Check if npm is installed: `npm --version`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

---

## 📄 License

MIT License - Free to use for educational purposes

---

## ✅ Submission Checklist

- ✅ Full CRUD operations implemented
- ✅ Proper HTTP status codes (200, 201, 400, 404, 500)
- ✅ Data validation
- ✅ Error handling
- ✅ Postman collection included
- ✅ README documentation
- ✅ Code is clean and well-commented
- ✅ Ready for production use

---

**Created:** May 1, 2026  
**Purpose:** Edutech Internship Task 8 - RESTful API Development  
**Status:** ✅ Complete and Production Ready  
**Repository:** [EduTech-Task8](https://github.com/SanthaKumar-K-2004/EduTech-Task8)
