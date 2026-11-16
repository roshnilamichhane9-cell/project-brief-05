module.exports = (req, res, next) => {
  const requestedAt = new Date().toISOString();
  console.log(`[${requestedAt}] ${req.method} ${req.originalUrl}`);
  next();
};
