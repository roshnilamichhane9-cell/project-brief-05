function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      quantity: 25,
      price: "₹60,000",
    },
    {
      id: 2,
      name: "Keyboard",
      category: "Accessories",
      quantity: 50,
      price: "₹1,500",
    },
    {
      id: 3,
      name: "Mouse",
      category: "Accessories",
      quantity: 75,
      price: "₹800",
    },
    {
      id: 4,
      name: "Monitor",
      category: "Electronics",
      quantity: 15,
      price: "₹15,000",
    },
  ];

  return (
    <div>

      <div className="page-title">
        <h2>Products</h2>

        <p>
          Manage products and inventory stock.
        </p>
      </div>


      <div className="section-card">

        <h3>Product List</h3>

        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>
                    {product.id}
                  </td>

                  <td>
                    {product.name}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    {product.quantity}
                  </td>

                  <td>
                    {product.price}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Products;