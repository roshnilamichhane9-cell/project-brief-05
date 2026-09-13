function Sales() {
  const sales = [
    {
      id: "S-001",
      product: "Laptop",
      quantity: 2,
      customer: "Customer A",
      status: "Completed",
    },
    {
      id: "S-002",
      product: "Mouse",
      quantity: 5,
      customer: "Customer B",
      status: "Completed",
    },
    {
      id: "S-003",
      product: "Monitor",
      quantity: 1,
      customer: "Customer C",
      status: "Completed",
    },
  ];

  return (
    <div>

      <div className="page-title">
        <h2>Sales</h2>

        <p>
          Manage sales transactions and outgoing stock.
        </p>
      </div>


      <div className="section-card">

        <h3>Sales Transactions</h3>

        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {sales.map((sale) => (
                <tr key={sale.id}>

                  <td>
                    {sale.id}
                  </td>

                  <td>
                    {sale.product}
                  </td>

                  <td>
                    {sale.quantity}
                  </td>

                  <td>
                    {sale.customer}
                  </td>

                  <td>
                    <span className="status">
                      {sale.status}
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

export default Sales;