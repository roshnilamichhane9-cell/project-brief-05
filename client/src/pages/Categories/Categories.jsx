function Categories() {
  const categories = [
    "Electronics",
    "Accessories",
    "Office Supplies",
    "Furniture",
    "Stationery",
  ];

  return (
    <div>

      <div className="page-title">
        <h2>Categories</h2>

        <p>
          Manage product categories.
        </p>
      </div>


      <div className="section-card">

        <h3>Category List</h3>

        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
              </tr>
            </thead>

            <tbody>

              {categories.map((category, index) => (
                <tr key={category}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {category}
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

export default Categories;