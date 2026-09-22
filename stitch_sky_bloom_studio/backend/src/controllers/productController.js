import { db } from '../data/db.js';
import { generateId } from '../utils/orderNumber.js';

export const productController = {
  // GET /api/products
  getAllProducts(req, res) {
    try {
      const { category, isFragrant, isHypoallergenic, isSingleStem, search, sortBy, limit, page } = req.query;
      let products = db.getProducts();

      // Search query
      if (search) {
        const q = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }

      // Category filter
      if (category && category !== 'all') {
        if (category === 'fragrance' || category === 'scented') {
          products = products.filter(p => p.isFragrant);
        } else if (category === 'hypoallergenic') {
          products = products.filter(p => p.isHypoallergenic);
        } else if (category === 'single-stems') {
          products = products.filter(p => p.isSingleStem);
        } else if (category === 'curated') {
          products = products.filter(p => p.category === 'curated' || !p.isSingleStem);
        } else {
          products = products.filter(p => p.category === category);
        }
      }

      // Boolean filters
      if (isFragrant === 'true') {
        products = products.filter(p => p.isFragrant);
      }
      if (isHypoallergenic === 'true') {
        products = products.filter(p => p.isHypoallergenic);
      }
      if (isSingleStem === 'true') {
        products = products.filter(p => p.isSingleStem);
      }

      // Sorting
      if (sortBy === 'price-low' || sortBy === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high' || sortBy === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        products.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }

      const total = products.length;

      // Pagination if requested
      if (page && limit) {
        const p = parseInt(page, 10) || 1;
        const l = parseInt(limit, 10) || 10;
        const start = (p - 1) * l;
        products = products.slice(start, start + l);
      }

      res.json({
        success: true,
        count: products.length,
        total,
        data: products
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/products/:id
  getProductById(req, res) {
    try {
      const { id } = req.params;
      const products = db.getProducts();
      const product = products.find(p => p.id === id);

      if (!product) {
        return res.status(404).json({ success: false, error: `Product '${id}' not found` });
      }

      // Related products
      const related = products
        .filter(p => p.id !== id && (p.category === product.category || p.isFragrant === product.isFragrant))
        .slice(0, 3);

      // Reviews
      const allReviews = db.getReviews();
      const reviews = allReviews.filter(r => r.productId === id);

      res.json({
        success: true,
        data: {
          ...product,
          related,
          reviews
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/products
  createProduct(req, res) {
    try {
      const { name, subtitle, price, category, categoryLabel, description, image, gallery, stemOptions, care, dimensions, isFragrant, isHypoallergenic, isSingleStem } = req.body;
      
      if (!name || !price) {
        return res.status(400).json({ success: false, error: 'Name and price are required.' });
      }

      const products = db.getProducts();
      const id = req.body.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (products.some(p => p.id === id)) {
        return res.status(400).json({ success: false, error: `Product with ID '${id}' already exists.` });
      }

      const newProduct = {
        id,
        name,
        subtitle: subtitle || '',
        price: Number(price),
        category: category || 'curated',
        categoryLabel: categoryLabel || 'SIGNATURE',
        isHypoallergenic: Boolean(isHypoallergenic),
        isFragrant: Boolean(isFragrant),
        isSingleStem: Boolean(isSingleStem),
        rating: 5.0,
        reviewsCount: 0,
        image: image || 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop',
        gallery: gallery || (image ? [image] : []),
        description: description || '',
        stemOptions: stemOptions || [{ count: 5, label: "Signature (5 Stems)", price: Number(price) }],
        care: care || ["Cut stems diagonally under water", "Keep in cool location", "Change water every 2 days"],
        dimensions: dimensions || "Approx. 45-55cm height",
        inStock: true,
        inventory: 50,
        createdAt: new Date().toISOString()
      };

      products.push(newProduct);
      db.saveProducts(products);

      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT /api/products/:id
  updateProduct(req, res) {
    try {
      const { id } = req.params;
      const products = db.getProducts();
      const index = products.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: `Product '${id}' not found` });
      }

      products[index] = {
        ...products[index],
        ...req.body,
        id // immutable id
      };

      db.saveProducts(products);
      res.json({ success: true, data: products[index] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE /api/products/:id
  deleteProduct(req, res) {
    try {
      const { id } = req.params;
      let products = db.getProducts();
      const exists = products.some(p => p.id === id);

      if (!exists) {
        return res.status(404).json({ success: false, error: `Product '${id}' not found` });
      }

      products = products.filter(p => p.id !== id);
      db.saveProducts(products);

      res.json({ success: true, message: `Product '${id}' deleted successfully` });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/products/:id/reviews
  addReview(req, res) {
    try {
      const { id } = req.params;
      const { userName, rating, comment } = req.body;

      if (!userName || !rating || !comment) {
        return res.status(400).json({ success: false, error: 'User name, rating (1-5), and comment are required.' });
      }

      const products = db.getProducts();
      const product = products.find(p => p.id === id);

      if (!product) {
        return res.status(404).json({ success: false, error: `Product '${id}' not found` });
      }

      const reviews = db.getReviews();
      const newReview = {
        id: generateId('rev'),
        productId: id,
        userName,
        rating: Math.min(5, Math.max(1, Number(rating))),
        date: new Date().toISOString().split('T')[0],
        comment,
        verifiedPurchase: true
      };

      reviews.push(newReview);
      db.saveReviews(reviews);

      // Recalculate product rating
      const productReviews = reviews.filter(r => r.productId === id);
      const avgRating = (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1);
      
      product.rating = parseFloat(avgRating);
      product.reviewsCount = productReviews.length;
      db.saveProducts(products);

      res.status(201).json({
        success: true,
        data: newReview,
        productRating: product.rating,
        reviewsCount: product.reviewsCount
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
