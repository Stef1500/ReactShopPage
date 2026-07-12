import { Link } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  //change Link to redirect to a details page
  return (
    <div className="product-card">
      <img
        src={product.image}
        className="product-card-image"
        alt={product.name}
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <h3 className="product-card-price">${product.price}</h3>
        <div className="product-card-actions">
          <Link to="/" className="btn btn-secondary">
            View details
          </Link>
          <button className="btn btn-primary">Head to cart</button>
        </div>
      </div>
    </div>
  );
}
