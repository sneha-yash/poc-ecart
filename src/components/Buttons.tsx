import { Button, ButtonProps } from "@mui/material";
import {ShoppingCartRounded, RemoveShoppingCart} from "@mui/icons-material";

export const AddCartButton = (props: ButtonProps) => {
    return(
        <Button variant="contained" startIcon={<ShoppingCartRounded />} {...props}>Add to Cart</Button>
    );
}


export const RemoveCartButton =(props: ButtonProps) => {
    return(
        <div>
            <style>{`
            .remove-btn {
          background: #ffebee;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1.125rem;
        }

        .remove-btn:hover {
          background: #f44336;
          transform: scale(1.05);
        }`}</style>
            <Button className="remove-btn" startIcon={<RemoveShoppingCart />}{...props}></Button>
        </div>
    );
}