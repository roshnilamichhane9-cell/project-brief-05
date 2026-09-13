function Card({ title, value, description }) {
  return (
    <div className="dashboard-card">

      <h3>{title}</h3>

      <div className="card-value">
        {value}
      </div>

      <p>
        {description}
      </p>

    </div>
  );
}

export default Card;