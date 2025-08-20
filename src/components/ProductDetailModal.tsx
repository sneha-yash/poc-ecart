import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cart";
import { AppDispatch } from "../redux/store";
import { useGetProductQuery } from "../redux/slices/products";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onClose,
  productId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductQuery(productId);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div">
          Product Details
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">
              {error && 'data' in error ? JSON.stringify(error.data) : 'An error occurred'}
            </Alert>
          </Box>
        )}

        {product && !isLoading && (
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {/* Product Information */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product?.title}
                </Typography>

                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  ₹ {product?.price}
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {product?.description}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Product ID: {product?.id}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        {product && (
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            sx={{ minWidth: 140 }}
          >
            Add to Cart
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
