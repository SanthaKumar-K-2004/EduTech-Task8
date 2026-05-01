# cURL Testing Guide - No Postman Required

Complete guide to test the REST API using cURL commands from the command line.

---

## 📋 Prerequisites

- API server running: `npm start`
- cURL installed (comes with Windows 10+, Mac, Linux)
- Terminal/Command Prompt/PowerShell

---

## ✅ Health Check

Verify the API is running:

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"success":true,"message":"API is running","timestamp":"2026-05-01T12:42:02.490Z"}
```

---

## 🔍 READ OPERATIONS (GET)

### Get All Products
```bash
curl http://localhost:5000/api/products
```

**Format with pretty JSON:**
```bash
curl -s http://localhost:5000/api/products | python -m json.tool
```

### Get Single Product
```bash
curl http://localhost:5000/api/products/1
```

### Filter by Category
```bash
curl "http://localhost:5000/api/products?category=Electronics"
```

### Filter by Price Range
```bash
curl "http://localhost:5000/api/products?minPrice=50&maxPrice=500"
```

### Filter Accessories Only
```bash
curl "http://localhost:5000/api/products?category=Accessories"
```

### Get Non-existent Product (404)
```bash
curl http://localhost:5000/api/products/999
```

---

## ➕ CREATE OPERATIONS (POST)

### Create a New Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Noise-cancelling headphones",
    "price": 149.99,
    "stock": 25,
    "category": "Electronics"
  }'
```

### Create with Minimal Data
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","price":299.99}'
```

### Test Invalid Data (Missing Price - 400 Error)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Bad Product"}'
```

### Test Negative Price (400 Error)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Invalid","price":-50}'
```

---

## ✏️ UPDATE OPERATIONS

### PUT (Replace Entire Product)
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "description": "Ultra-powerful laptop",
    "price": 1299.99,
    "stock": 8,
    "category": "Premium Electronics"
  }'
```

### PATCH (Partial Update)
```bash
curl -X PATCH http://localhost:5000/api/products/2 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "stock": 60
  }'
```

### Update Non-existent Product (404)
```bash
curl -X PUT http://localhost:5000/api/products/999 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ghost","price":99.99}'
```

---

## 🗑️ DELETE OPERATIONS

### Delete a Product
```bash
curl -X DELETE http://localhost:5000/api/products/5
```

### Delete Non-existent Product (404)
```bash
curl -X DELETE http://localhost:5000/api/products/999
```

---

## 🧪 Complete CRUD Workflow (Execute in Order)

### Step 1: Get All Products (Before)
```bash
curl http://localhost:5000/api/products
```

### Step 2: Create New Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smart Watch",
    "description": "Fitness tracking smartwatch",
    "price": 299.99,
    "stock": 45,
    "category": "Electronics"
  }'
```
**Note the returned ID**

### Step 3: Read Created Product (Replace ID with response)
```bash
curl http://localhost:5000/api/products/6
```

### Step 4: Update Product Price
```bash
curl -X PATCH http://localhost:5000/api/products/6 \
  -H "Content-Type: application/json" \
  -d '{"price": 249.99}'
```

### Step 5: Delete Product
```bash
curl -X DELETE http://localhost:5000/api/products/6
```

### Step 6: Get All Products (After)
```bash
curl http://localhost:5000/api/products
```

---

## 🖼️ Pretty-Print JSON Responses

### Using Python (Unix/Mac)
```bash
curl -s http://localhost:5000/api/products | python -m json.tool
```

### Using Python 3
```bash
curl -s http://localhost:5000/api/products | python3 -m json.tool
```

### Using Node.js
```bash
curl -s http://localhost:5000/api/products | node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(0, 'utf-8')), null, 2))"
```

### Using PowerShell (Windows)
```powershell
curl http://localhost:5000/api/products | ConvertFrom-Json | ConvertTo-Json
```

---

## 📊 Testing All Error Cases

### Test 404 - Product Not Found
```bash
curl http://localhost:5000/api/products/999
```

**Response:**
```
{"success":false,"message":"Product with ID 999 not found","data":null}
```

### Test 400 - Missing Required Field
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"description":"No name or price"}'
```

**Response:**
```
{"success":false,"message":"Name and price are required fields","data":null}
```

### Test 400 - Invalid Price
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":-99}'
```

**Response:**
```
{"success":false,"message":"Price must be a positive number","data":null}
```

### Test 404 - Delete Non-existent
```bash
curl -X DELETE http://localhost:5000/api/products/999
```

**Response:**
```
{"success":false,"message":"Product with ID 999 not found","data":null}
```

---

## 🔧 cURL Tips & Tricks

### Save Response to File
```bash
curl http://localhost:5000/api/products > response.json
```

### Show Headers Only
```bash
curl -i http://localhost:5000/api/products
```

### Show Request and Response Details
```bash
curl -v http://localhost:5000/api/products
```

### Set Custom Headers
```bash
curl -H "Accept: application/json" \
     -H "User-Agent: MyApp/1.0" \
     http://localhost:5000/api/products
```

### Save to Variable (Bash)
```bash
response=$(curl -s http://localhost:5000/api/products/1)
echo $response
```

### Measure Response Time
```bash
curl -w "Time: %{time_total}s\n" http://localhost:5000/api/products
```

---

## 🔄 Quick Reference Commands

| Operation | Command |
|---|---|
| **Health Check** | `curl http://localhost:5000/api/health` |
| **Get All** | `curl http://localhost:5000/api/products` |
| **Get One** | `curl http://localhost:5000/api/products/1` |
| **Create** | `curl -X POST -H "Content-Type: application/json" -d '...' http://localhost:5000/api/products` |
| **Update (PUT)** | `curl -X PUT -H "Content-Type: application/json" -d '...' http://localhost:5000/api/products/1` |
| **Update (PATCH)** | `curl -X PATCH -H "Content-Type: application/json" -d '...' http://localhost:5000/api/products/1` |
| **Delete** | `curl -X DELETE http://localhost:5000/api/products/1` |

---

## 📚 Response Status Codes

| Code | Meaning | Example |
|---|---|---|
| **200** | OK | GET, PUT, PATCH, DELETE success |
| **201** | Created | POST success (new resource created) |
| **400** | Bad Request | Invalid input or validation failed |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Unexpected server error |

---

## 💾 Save Useful Commands

Create a file called `curl-commands.sh` with all your commonly used commands:

```bash
#!/bin/bash

# API Base URL
API="http://localhost:5000/api"

# Function: Get all products
getAll() {
  curl "$API/products"
}

# Function: Get product by ID
getById() {
  curl "$API/products/$1"
}

# Function: Create product
create() {
  curl -X POST "$API/products" \
    -H "Content-Type: application/json" \
    -d "$1"
}

# Usage: . curl-commands.sh
# Then: getAll
# Or: getById 1
# Or: create '{"name":"Test","price":99.99}'
```

Save and use:
```bash
. curl-commands.sh
getAll
```

---

## ✅ Troubleshooting

### "Connection refused"
- Ensure server is running: `npm start`
- Check port 5000 is not used by another application

### "Command not found: curl"
- On Windows: Use PowerShell or download cURL
- On Mac: Already installed
- On Linux: Install with `sudo apt-get install curl`

### "JSON parse error"
- Add `-s` flag for silent mode: `curl -s http://localhost:5000/api/products`
- Pipe to JSON formatter: `curl -s ... | python -m json.tool`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

## 🎓 Learning Path

1. Start with GET requests (read data)
2. Test filtering with query parameters
3. Try POST to create data
4. Experiment with PATCH updates
5. Test PUT full replacements
6. Delete resources
7. Test error cases
8. Review response codes

---

**API Status:** Ready for testing ✅

