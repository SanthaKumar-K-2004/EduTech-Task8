# Sample Product Data

## Initial Products Loaded

This file documents the sample data included in the API for testing.

---

## 📦 Product Database

### Product 1: Laptop
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 10,
  "category": "Electronics"
}
```
- **Price:** $999.99
- **Stock:** 10 units
- **Category:** Electronics
- **Use Case:** Development, gaming, heavy workloads

---

### Product 2: Mouse
```json
{
  "id": 2,
  "name": "Mouse",
  "description": "Wireless mouse",
  "price": 29.99,
  "stock": 50,
  "category": "Accessories"
}
```
- **Price:** $29.99
- **Stock:** 50 units
- **Category:** Accessories
- **Use Case:** Complement laptop/desktop setup

---

### Product 3: Keyboard
```json
{
  "id": 3,
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 79.99,
  "stock": 30,
  "category": "Accessories"
}
```
- **Price:** $79.99
- **Stock:** 30 units
- **Category:** Accessories
- **Use Case:** Professional typing, gaming

---

### Product 4: Monitor
```json
{
  "id": 4,
  "name": "Monitor",
  "description": "27-inch 4K monitor",
  "price": 399.99,
  "stock": 15,
  "category": "Electronics"
}
```
- **Price:** $399.99
- **Stock:** 15 units
- **Category:** Electronics
- **Use Case:** Professional work, content creation

---

### Product 5: USB Cable
```json
{
  "id": 5,
  "name": "USB Cable",
  "description": "High-speed USB-C cable",
  "price": 9.99,
  "stock": 100,
  "category": "Accessories"
}
```
- **Price:** $9.99
- **Stock:** 100 units
- **Category:** Accessories
- **Use Case:** Data transfer, charging

---

## 📊 Data Statistics

### By Category
| Category | Count | Total Value | Avg Price |
|---|---|---|---|
| Electronics | 2 | $1,399.98 | $699.99 |
| Accessories | 3 | $119.97 | $39.99 |
| **Total** | **5** | **$1,519.95** | **$303.99** |

### By Price Range
| Range | Products | Count |
|---|---|---|
| < $30 | Mouse, USB Cable | 2 |
| $30 - $100 | Keyboard | 1 |
| $100 - $500 | Monitor | 1 |
| > $500 | Laptop | 1 |

### By Stock Level
| Stock Range | Products | Count |
|---|---|---|
| Very High (>50) | USB Cable | 1 |
| High (30-50) | Mouse, Keyboard | 2 |
| Medium (10-30) | Laptop, Monitor | 2 |

---

## 🔄 Creating Test Data

You can create additional products using the API:

### Example 1: Electronics Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "description": "Latest model Android phone",
    "price": 599.99,
    "stock": 20,
    "category": "Electronics"
  }'
```

### Example 2: Accessory Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Phone Case",
    "description": "Protective phone case",
    "price": 19.99,
    "stock": 75,
    "category": "Accessories"
  }'
```

### Example 3: Minimal Data
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budget Item",
    "price": 49.99
  }'
```
This creates a product with only required fields.

---

## 🔍 Filtering Examples

### Get Electronics Only
```
GET /api/products?category=Electronics
```
Returns: Laptop, Monitor (2 products)

### Get Accessories Only
```
GET /api/products?category=Accessories
```
Returns: Mouse, Keyboard, USB Cable (3 products)

### Get Products Under $100
```
GET /api/products?maxPrice=100
```
Returns: Mouse, Keyboard, USB Cable (3 products)

### Get Products Between $50-$500
```
GET /api/products?minPrice=50&maxPrice=500
```
Returns: Keyboard, Monitor (2 products)

---

## 💡 Testing Scenarios

### Scenario 1: Add New Product
1. Create a new product via POST
2. Verify with GET all products
3. Find by specific ID

### Scenario 2: Update Product
1. Update price with PATCH
2. Verify with GET by ID
3. Check in all products list

### Scenario 3: Delete Product
1. Note the product count
2. Delete a product
3. Verify count decreased

### Scenario 4: Filtering
1. Use category filter
2. Use price range filter
3. Combine with pagination (future feature)

---

## 📝 Notes for Development

- **Next ID:** 6 (next product created will have id: 6)
- **Data Persistence:** In-memory only (resets on server restart)
- **Validation:** Price and name are required; others optional
- **Stock:** Defaults to 0 if not provided
- **Category:** Defaults to "Uncategorized" if not provided

---

## 🚀 Future Data Features

Consider these enhancements:
- Add timestamp fields (createdAt, updatedAt)
- Add product images/thumbnails
- Add SKU (Stock Keeping Unit)
- Add barcode field
- Add supplier information
- Add reviews/ratings
- Add product variants (colors, sizes)
- Add tags for better categorization

---

