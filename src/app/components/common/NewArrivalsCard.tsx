import { Box, Button, Stack } from "@mui/material";
import { Product } from "../../../libs/types/product";

interface NewArrivalsCardProps {
  product: Product;
  imagePath: string;
  onAdd: any;
}

export default function NewArrivalCard(props: NewArrivalsCardProps) {
  const { product, imagePath, onAdd } = props;

  return (
    <Stack className="new-card">
      <Box className="new-frame">
        <img src={imagePath} alt=""/>
      </Box>
      <Stack className="new-content">
        <Stack className="titles">
          <span>{product.productName}</span>
          <p>{product.productAuthorName}</p>
        </Stack>
        <Stack className="new-footer">
          <span>${product.productPrice}</span>
          <Button 
            className="butt"
            onClick={(e) => {
              e.stopPropagation();
              onAdd({
                _id: product._id,
                quantity: 1,
                name: product.productName,
                price: product.productPrice,
                image: product.productImages[0],
              });
            }}
          >
            🛒 Add
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}