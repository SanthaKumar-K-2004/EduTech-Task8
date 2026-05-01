# API Testing & Screenshots Guide

## ✅ API Testing Complete

The REST API has been successfully tested and verified. All CRUD operations are working correctly.

---

## 🧪 Test Results

### 1. Health Check Endpoint ✅
**Request:** `GET http://localhost:5000/api/health`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-05-01T12:42:02.490Z"
}
```

---

### 2. Get All Products ✅
**Request:** `GET http://localhost:5000/api/products`

**Response (200 OK):**
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
    },
    {
      "id": 2,
      "name": "Mouse",
      "description": "Wireless mouse",
      "price": 29.99,
      "stock": 50,
      "category": "Accessories"
    },
    {
      "id": 3,
      "name": "Keyboard",
      "description": "Mechanical keyboard",
      "price": 79.99,
      "stock": 30,
      "category": "Accessories"
    },
    {
      "id": 4,
      "name": "Monitor",
      "description": "27-inch 4K monitor",
      "price": 399.99,
      "stock": 15,
      "category": "Electronics"
    },
    {
      "id": 5,
      "name": "USB Cable",
      "description": "High-speed USB-C cable",
      "price": 9.99,
      "stock": 100,
      "category": "Accessories"
    }
  ],
  "count": 5
}
```

---

### 3. Get Single Product by ID ✅
**Request:** `GET http://localhost:5000/api/products/1`

**Response (200 OK):**
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

### 4. Filter Products by Category ✅
**Request:** `GET http://localhost:5000/api/products?category=Electronics`

**Response (200 OK):**
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
    },
    {
      "id": 4,
      "name": "Monitor",
      "description": "27-inch 4K monitor",
      "price": 399.99,
      "stock": 15,
      "category": "Electronics"
    }
  ],
  "count": 2
}
```

---

## 📊 How to Test with Postman

### Step 1: Import Collection
1. Open Postman
2. Click **File** → **Import**
3. Select `Product_API_Postman_Collection.json`
4. Collection is ready with all endpoints pre-configured

### Step 2: Ensure Server is Running
```bash
npm start
# Should see "🚀 Server running on: http://localhost:5000"
```

### Step 3: Test Each Folder
- **Health Check** - Verifies API is running
- **Read Operations** - Test all GET requests
- **Create Operations** - Test POST requests (201 status)
- **Update Operations** - Test PUT and PATCH requests
- **Delete Operations** - Test DELETE requests
- **Complete CRUD Workflow** - Full workflow demonstration

### Step 4: Run a Request
1. Click any request in the collection
2. Click **Send** button
3. View the response below

---

## 🔴 Testing Error Cases

### Test 404 Error
**Request:** `GET http://localhost:5000/api/products/999`

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Product with ID 999 not found",
  "data": null
}
```

---

### Test 400 Error (Invalid Data)
**Request:** `POST http://localhost:5000/api/products`

**Body:**
```json
{
  "name": "Invalid Product",
  "price": -50
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Price must be a positive number",
  "data": null
}
```

---

### Test 400 Error (Missing Required Fields)
**Request:** `POST http://localhost:5000/api/products`

**Body:**
```json
{
  "description": "No price",
  "stock": 10
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name and price are required fields",
  "data": null
}
```

---

## 📈 Test Coverage Summary

| Operation | Method | Endpoint | Status | Count |
|---|---|---|---|---|
| Read All | GET | `/api/products` | ✅ Working | 1 |
| Read Single | GET | `/api/products/:id` | ✅ Working | 1 |
| Read with Filter | GET | `/api/products?category=...` | ✅ Working | 1 |
| Create | POST | `/api/products` | ✅ Working | 1 |
| Update Full | PUT | `/api/products/:id` | ✅ Working | 1 |
| Update Partial | PATCH | `/api/products/:id` | ✅ Working | 1 |
| Delete | DELETE | `/api/products/:id` | ✅ Working | 1 |
| Health Check | GET | `/api/health` | ✅ Working | 1 |
| **Total Tests** | | | | **8** |

---

## ✨ Key Features Verified

✅ All CRUD operations working
✅ Correct HTTP status codes (200, 201, 400, 404)
✅ Proper error messages
✅ Query parameter filtering
✅ JSON response format
✅ Data validation
✅ No errors in server logs

---

## 🎯 Testing Checklist

- ✅ Server starts successfully
- ✅ Health check endpoint responds
- ✅ GET all products returns 5 products
- ✅ GET single product returns correct data
- ✅ Filtering by category works
- ✅ Filtering by price range works
- ✅ POST creates new products (201 Created)
- ✅ PUT updates entire product (200 OK)
- ✅ PATCH partially updates product (200 OK)
- ✅ DELETE removes products (200 OK)
- ✅ 404 returned for non-existent products
- ✅ 400 returned for invalid input
- ✅ Response format is consistent
- ✅ CORS enabled for cross-origin requests

---

## 🚀 Next Testing Steps

1. **Import Postman Collection** - `Product_API_Postman_Collection.json`
2. **Run Complete CRUD Workflow** - Follow the 6-step workflow
3. **Test All Error Cases** - Verify error handling
4. **Load Test (Optional)** - Test with multiple requests
5. **Integrate with Frontend** - Connect to a web app

---

## 💾 Server Running

```
Terminal Running: YES ✅
Port: 5000
Status: LISTENING
Endpoints: 7 Available
Initial Products: 5 Loaded
```

**To stop the server:** Press `Ctrl+C` in the terminal

---

## 🔗 Quick Test URLs

| Purpose | URL |
|---|---|
| Health Check | http://localhost:5000/api/health |
| All Products | http://localhost:5000/api/products |
| Product ID 1 | http://localhost:5000/api/products/1 |
| Electronics Only | http://localhost:5000/api/products?category=Electronics |
| Accessories Only | http://localhost:5000/api/products?category=Accessories |
| Price $0-100 | http://localhost:5000/api/products?minPrice=0&maxPrice=100 |

---

**API Status:** ✅ FULLY FUNCTIONAL AND TESTED

