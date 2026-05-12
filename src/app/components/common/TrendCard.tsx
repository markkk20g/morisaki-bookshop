

export default function TrendCard() {
  // const { title, author, image, price } = props;

  return (
    <div className="trend-card">
      <div className="trend-frame">
        <img src={"/img/new/night-owl.jpg"} alt={""} className="card-image" />
      </div>
      <div className="trend-content">
        <span className="trend-title">Night Owl</span>
        <p className="trend-author">Aimee Nezhukumatathil</p>

        <div className="trend-footer">
          <span className="trend-price">$21.50</span>

          <button className="trend-button">🛒 Add</button>
        </div>
      </div>
    </div>
  );
}