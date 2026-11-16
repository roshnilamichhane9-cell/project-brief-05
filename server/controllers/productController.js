exports.getProducts = (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET /api/products route is working. Product data is not persisted yet.",
    products: []
  });
};

exports.getProductById = (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET /api/products/:id route is working. Product data is not persisted yet.",
    productId: req.params.id
  });
};

exports.createProduct = (req, res) => {
  res.status(201).json({
    success: true,
    message: "POST /api/products route is working. Product data is not persisted yet.",
    product: req.body
  });
};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    success: true,
    message: "PUT /api/products/:id route is working. Product data is not persisted yet.",
    productId: req.params.id,
    updates: req.body
  });
};

exports.deleteProduct = (req, res) => {
  res.status(200).json({
    success: true,
    message: "DELETE /api/products/:id route is working. Product data is not persisted yet.",
    productId: req.params.id
  });
};
