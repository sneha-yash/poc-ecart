import * as React from 'react';
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

export default function ProductCard({product}: {product: any}) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product:any) => {
    dispatch(addToCart(product))
  };
  return (
    <Card sx={{ width: 320, position: 'relative' }}>

      <CardMedia
        component="img"
        height="200"
        image={product.images?.[0]}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent>
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
        <AddCartButton onClick={() => handleAddToCart(product)}/>
      </CardActions>
    </Card>

  );
}
