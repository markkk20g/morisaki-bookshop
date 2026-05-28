import { Button } from "@mui/material";
import { Product } from "../../../libs/types/product";

interface TrendingCardProps {
  product: Product;
  imagePath: string;
  // onAdd: any;
}

export default function TrendCard(props: TrendingCardProps) {
  const { product, imagePath } = props;


  return (
    <div className="trend-card">
      <div className="trend-frame">
        <img src={imagePath} alt={""} className="card-image" />
      </div>
      <div className="trend-content">
        <span className="trend-title">{product.productName}</span>
        <p className="trend-author">{product.productAuthorName}</p>

        <div className="trend-footer">
          <span className="trend-price">${product.productPrice.toFixed(2)}</span>

          {/* <button className="trend-button">🛒 Add</button> */}
          <Button className="trend-button">See details</Button>
        </div>
      </div>
    </div>
  );
}