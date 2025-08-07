import "./item.css"
import { Link } from "react-router-dom";

export default function FoodItem({ img, name, browse_description, price, id }) {
  return (
    <div className="food-item vertical">
      <img src={img} />

      <div className="content">
        <h1>{name}</h1>
        <p>{browse_description}</p>
      </div>

      <div className="price-container">
        <span className="price">{price}</span>

        {/* assign route and paramter to pass when click */}
        <Link to={`/ItemDetail/${id}`}>
          <button className="order"></button>
          <button className="later"></button>
        </Link>
      </div>
    </div>
  );
} 