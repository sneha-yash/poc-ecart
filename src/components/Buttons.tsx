import { Button, ButtonProps } from "@mui/material";
import {ShoppingCartRounded} from "@mui/icons-material";

export const AddCartButton = (props: ButtonProps) => {
    return(
        <Button variant="contained" startIcon={<ShoppingCartRounded />} {...props}>Add to Cart</Button>
    );
}