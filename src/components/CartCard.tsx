import React from "react";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import type { CartCardProps } from "../interfaces/cart.type";
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, Chip, IconButton, Typography } from "@mui/material";

const CartCard: React.FC<CartCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const totalPrice = item.price * item.cartQuantity;
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  return (
    <Card
      elevation={2}
      sx={{ 
        borderRadius: 2,
        '&:hover': {
          elevation: 4,
          boxShadow: 3
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Product Section */}
          <Box sx={{ display: 'flex', gap: 2, flex: 1, minWidth: '300px' }}>
            {/* Product Image */}
            <Avatar
              src={item.images?.[0]}
              alt={item.title}
              variant="rounded"
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2
              }}
            />

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  lineHeight: 1.2
                }}
              >
                {item.title}
              </Typography>
              
              {item.slug && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {item.slug}
                </Typography>
              )}

              {/* Price Display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontWeight: 700,
                    color: 'primary.main'
                  }}
                >
                  ₹{item.price.toFixed(2)}
                </Typography>
                
                {hasDiscount && (
                  <>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        textDecoration: 'line-through',
                        color: 'text.secondary'
                      }}
                    >
                      ₹{item?.originalPrice?.toFixed(2)}
                    </Typography>
                    
                    <Chip
                      label="SALE" 
                      size="small"
                      color="error"
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Controls Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            minWidth: '180px',
            alignItems: 'flex-end'
          }}>
            {/* Quantity Controls */}
            {onQuantityChange && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Quantity
                </Typography>
                
                <ButtonGroup 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    '& .MuiButton-root': {
                      minWidth: 40,
                      border: '1px solid',
                      borderColor: 'divider'
                    }
                  }}
                >
                  <Button
                    onClick={() => handleQuantityChange(item.cartQuantity - 1)}
                    disabled={item.cartQuantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  
                  <Button 
                    disabled
                    sx={{ 
                      color: 'text.primary !important',
                      fontWeight: 600,
                      cursor: 'default'
                    }}
                  >
                    {item.cartQuantity}
                  </Button>
                  
                  <Button
                    onClick={() => handleQuantityChange(item.cartQuantity + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>
            )}

            {/* Total Price and Actions */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end',
              gap: 1 
            }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  Total
                </Typography>
                <Typography 
                  variant="h5"
                  sx={{ 
                    fontWeight: 700,
                    color: 'success.main'
                  }}
                >
                  ₹{totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              {onRemove && (
                <IconButton
                  onClick={() => onRemove(item.id)}
                  color="error"
                  size="small"
                  title="Remove item"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'error.50'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartCard;
