const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for products
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    stock: 10,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29.99,
    stock: 50,
    category: 'Accessories'
  },
  {
    id: 3,
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: 79.99,
    stock: 30,
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Monitor',
    description: '27-inch 4K monitor',
    price: 399.99,
    stock: 15,
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'USB Cable',
    description: 'High-speed USB-C cable',
    price: 9.99,
    stock: 100,
    category: 'Accessories'
  }
];

// Counter for generating new IDs
let nextId = 6;

// ============================================
// GET ALL PRODUCTS (Read)
// ============================================
app.get('/api/products', (req, res) => {
  try {
    // Optional query parameters for filtering
    const { category, minPrice, maxPrice } = req.query;
    let filteredProducts = [...products];

    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: filteredProducts,
      count: filteredProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message
    });
  }
});

// ============================================
// GET SINGLE PRODUCT BY ID (Read)
// ============================================
app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: error.message
    });
  }
});

// ============================================
// CREATE NEW PRODUCT (Create)
// ============================================
app.post('/api/products', (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required fields',
        data: null
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number',
        data: null
      });
    }

    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a positive number',
        data: null
      });
    }

    // Create new product
    const newProduct = {
      id: nextId++,
      name: name.trim(),
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      category: category || 'Uncategorized',
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// ============================================
// UPDATE PRODUCT (Update - PUT)
// ============================================
app.put('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
        data: null
      });
    }

    // Validation for updated fields
    if (price !== undefined) {
      if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a positive number',
          data: null
        });
      }
    }

    if (stock !== undefined) {
      if (typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock must be a positive number',
          data: null
        });
      }
    }

    // Update product with provided fields
    product.name = name !== undefined ? name.trim() : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.stock = stock !== undefined ? parseInt(stock) : product.stock;
    product.category = category !== undefined ? category : product.category;
    product.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// ============================================
// PARTIAL UPDATE PRODUCT (Update - PATCH)
// ============================================
app.patch('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
        data: null
      });
    }

    // Validate specific fields if provided
    if (updates.price !== undefined) {
      if (typeof updates.price !== 'number' || updates.price < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a positive number',
          data: null
        });
      }
    }

    if (updates.stock !== undefined) {
      if (typeof updates.stock !== 'number' || updates.stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock must be a positive number',
          data: null
        });
      }
    }

    // Apply updates
    Object.keys(updates).forEach(key => {
      if (key === 'name') {
        product[key] = updates[key].trim();
      } else if (key === 'price') {
        product[key] = parseFloat(updates[key]);
      } else if (key === 'stock') {
        product[key] = parseInt(updates[key]);
      } else {
        product[key] = updates[key];
      }
    });

    product.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Product partially updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// ============================================
// DELETE PRODUCT (Delete)
// ============================================
app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
        data: null
      });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// 404 - NOT FOUND
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Product API Server Started          ║
║   🚀 Server running on:               ║
║      http://localhost:${PORT}         ║
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
  `);
});

module.exports = app;
