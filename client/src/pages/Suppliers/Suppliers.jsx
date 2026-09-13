function Suppliers() {
  const suppliers = [
    {
      id: 1,
      name: "ABC Electronics",
      contact: "9800000001",
      email: "abc@example.com",
    },
    {
      id: 2,
      name: "Tech World",
      contact: "9800000002",
      email: "tech@example.com",
    },
    {
      id: 3,
      name: "Office Supplies Ltd.",
      contact: "9800000003",
      email: "office@example.com",
    },
  ];

  return (
    <div>

      <div className="page-title">
        <h2>Suppliers</h2>

        <p>
          Manage suppliers and supplier information.
        </p>
      </div>


      <div className="section-card">

        <h3>Supplier List</h3>

        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>

              {suppliers.map((supplier) => (
                <tr key={supplier.id}>

                  <td>
                    {supplier.id}
                  </td>

                  <td>
                    {supplier.name}
                  </td>

                  <td>
                    {supplier.contact}
                  </td>

                  <td>
                    {supplier.email}
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

export default Suppliers;