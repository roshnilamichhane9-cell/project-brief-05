function Purchases() {
  const purchases = [
    {
      id: "PO-001",
      supplier: "ABC Electronics",
      product: "Laptop",
      quantity: 10,
      status: "Received",
    },
    {
      id: "PO-002",
      supplier: "Tech World",
      product: "Keyboard",
      quantity: 30,
      status: "Pending",
    },
    {
      id: "PO-003",
      supplier: "Office Supplies Ltd.",
      product: "Monitor",
      quantity: 15,
      status: "Received",
    },
  ];

  return (
    <div>

      <div className="page-title">
        <h2>Purchases</h2>

        <p>
          Manage purchase orders and incoming stock.
        </p>
      </div>


      <div className="section-card">

        <h3>Purchase Orders</h3>

        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Supplier</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {purchases.map((purchase) => (
                <tr key={purchase.id}>

                  <td>
                    {purchase.id}
                  </td>

                  <td>
                    {purchase.supplier}
                  </td>

                  <td>
                    {purchase.product}
                  </td>

                  <td>
                    {purchase.quantity}
                  </td>

                  <td>
                    <span className="status">
                      {purchase.status}
                    </span>
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

export default Purchases;