# 🎯 API Quick Reference Card

**Cheat Sheet for Product API CRUD Operations**

---

## 🚀 Start Server
```bash
npm install      # Install dependencies once
npm start        # Start server on port 5000
```

---

## 📋 Endpoints Cheat Sheet

| # | Method | Path | Purpose | Returns |
|---|---|---|---|---|
| 1 | GET | /api/health | Check if running | 200 |
| 2 | GET | /api/products | Get all | 200 |
| 3 | GET | /api/products/1 | Get one | 200 |
| 4 | POST | /api/products | Create | 201 |
| 5 | PUT | /api/products/1 | Replace all | 200 |
| 6 | PATCH | /api/products/1 | Update some | 200 |
| 7 | DELETE | /api/products/1 | Remove | 200 |

---

## 🔗 Live Test URLs (Copy & Paste)

```
Health Check:
http://localhost:5000/api/health

All Products:
http://localhost:5000/api/products

By ID:
http://localhost:5000/api/products/1

By Category:
http://localhost:5000/api/products?category=Electronics

By Price:
http://localhost:5000/api/products?minPrice=50&maxPrice=500
```

---

## 📤 POST - Create Product

**Command:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Phone","price":599.99,"stock":20,"category":"Electronics"}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 6,
    "name": "Phone",
    "price": 599.99,
    "stock": 20,
    "category": "Electronics"
  }
}
```

---

## 📨 PUT - Full Update

**Command:**
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ultra Laptop","description":"Best laptop","price":1299.99,"stock":5,"category":"Electronics"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ...updated product... }
}
```

---

## ✏️ PATCH - Partial Update

**Command:**
```bash
curl -X PATCH http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":899.99,"stock":10}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ...updated product... }
}
```

---

## 🗑️ DELETE - Remove Product

**Command:**
```bash
curl -X DELETE http://localhost:5000/api/products/5
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": { ...deleted product... }
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name and price are required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product with ID 999 not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## 📊 HTTP Status Codes

| Code | When | Example |
|---|---|---|
| **200** | Success | GET, PUT, PATCH, DELETE work |
| **201** | Created | POST creates new |
| **400** | Bad data | Invalid price, missing field |
| **404** | Not found | ID doesn't exist |
| **500** | Server error | Unexpected error |

---

## 🔄 Full CRUD Workflow

```bash
# 1. Create
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","price":399.99}'
# Returns: id: 6

# 2. Read
curl http://localhost:5000/api/products/6

# 3. Update
curl -X PATCH http://localhost:5000/api/products/6 \
  -H "Content-Type: application/json" \
  -d '{"price":349.99}'

# 4. Delete
curl -X DELETE http://localhost:5000/api/products/6
```

---

## 🎯 POST vs PUT

| | POST | PUT |
|---|---|---|
| **Purpose** | Create new | Replace all |
| **Status** | 201 Created | 200 OK |
| **Idempotent** | No | Yes |
| **Data** | New resource | All fields |
| **Example** | POST /products | PUT /products/1 |

---

## 📝 Create Product Template

**Minimum Required:**
```json
{
  "name": "Product Name",
  "price": 99.99
}
```

**Full Template:**
```json
{
  "name": "Product Name",
  "description": "Description here",
  "price": 99.99,
  "stock": 50,
  "category": "Electronics"
}
```

---

## 🧪 Quick Test Commands

```bash
# Health check
curl http://localhost:5000/api/health

# Get all
curl http://localhost:5000/api/products

# Get one
curl http://localhost:5000/api/products/1

# Create
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":99.99}'

# Update
curl -X PATCH http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":79.99}'

# Delete
curl -X DELETE http://localhost:5000/api/products/1
```

---

## 📚 Sample Products (Initial Data)

```
ID 1: Laptop        $999.99   Electronics
ID 2: Mouse          $29.99   Accessories
ID 3: Keyboard       $79.99   Accessories
ID 4: Monitor       $399.99   Electronics
ID 5: USB Cable       $9.99   Accessories
```

---

## 🔍 Filter Examples

```
Get Electronics:
http://localhost:5000/api/products?category=Electronics

Get Accessories:
http://localhost:5000/api/products?category=Accessories

Get under $100:
http://localhost:5000/api/products?maxPrice=100

Get $50-$500:
http://localhost:5000/api/products?minPrice=50&maxPrice=500
```

---

## 💾 Pretty Print JSON

**Windows PowerShell:**
```powershell
curl http://localhost:5000/api/products | ConvertFrom-Json | ConvertTo-Json
```

**Mac/Linux (Python):**
```bash
curl -s http://localhost:5000/api/products | python -m json.tool
```

**Mac/Linux (Python 3):**
```bash
curl -s http://localhost:5000/api/products | python3 -m json.tool
```

---

## ⚡ One-Liners

```bash
# Quick test if API is running
curl -s http://localhost:5000/api/health | grep success

# Count products
curl -s http://localhost:5000/api/products | grep -o '"id"' | wc -l

# Get just product names
curl -s http://localhost:5000/api/products | grep '"name"'

# Check if product 1 exists
curl -o /dev/null -s -w "%{http_code}" http://localhost:5000/api/products/1
```

---

## 🎓 Interview Prep

**POST vs PUT:**
- POST creates NEW (201)
- PUT replaces ALL (200)
- POST called 3x = 3 resources
- PUT called 3x = 1 resource

**HTTP 201:**
- Means "Created"
- Only on POST success
- Includes new resource data
- Different from 200 OK

**REST Principles:**
- GET = Read
- POST = Create (201)
- PUT = Replace all
- PATCH = Update some
- DELETE = Remove

---

## 🚨 Troubleshooting

**Port in use:**
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**Dependencies missing:**
```bash
npm install
```

**Server won't start:**
```bash
rm -rf node_modules
npm install
npm start
```

---

## 📖 Documentation Files

| File | When to Use |
|---|---|
| README.md | Complete guide |
| TESTING_GUIDE.md | Verification |
| CURL_TESTING_GUIDE.md | Command examples |
| SAMPLE_DATA.md | Data reference |
| PROJECT_SUMMARY.md | Overview |
| DOCUMENTATION_INDEX.md | Navigation |
| QUICK_REFERENCE.md | This file ⭐ |

---

## 🎯 Common Tasks

**Create product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"NewItem","price":49.99}'
```

**Change price:**
```bash
curl -X PATCH http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":79.99}'
```

**Get by category:**
```bash
curl "http://localhost:5000/api/products?category=Electronics"
```

**Remove item:**
```bash
curl -X DELETE http://localhost:5000/api/products/1
```

---

## ✅ Checklist

- [ ] Server running (`npm start`)
- [ ] Can access http://localhost:5000/api/health
- [ ] Can GET /api/products
- [ ] Can POST new product (201)
- [ ] Can PATCH update (200)
- [ ] Can DELETE product (200)
- [ ] Understand POST vs PUT
- [ ] Know what 201 means

---

**Print this card for quick reference!** 🖨️

