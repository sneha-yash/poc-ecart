import * as React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from '@mui/material';
import { AddCartButton } from './Buttons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cart';
import { AppDispatch } from '../redux/store';
import ProductDetailModal from './ProductDetailModal';
import { fetchProductDetails } from '../services/productService';
import { Product } from '../interfaces/product.type';

export default function ProductCard({product}: {product: Product}) {
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (product:any) => {
    dispatch(addToCart(product))
  };

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Card
        sx={{
          width: 320,
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          }
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="200"
          crossOrigin="anonymous"
          image={product.images?.[0]}
          alt={product.title}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ height: "35%" }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.slug}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Total price:
          </Typography>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            ₹ {product.price}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <AddCartButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking the button
              handleAddToCart(product);
            }}
          />
        </CardActions>
      </Card>

      <ProductDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        productId={product.id}
        onFetchProductDetails={fetchProductDetails}
      />
    </>
  );
}
