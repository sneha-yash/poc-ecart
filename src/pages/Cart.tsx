import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../redux/slices/cart";
import type { CartItem } from "../interfaces/cart.type";
import HeaderComponent from "../components/Header";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart as ShoppingCartIcon,
  ShoppingCartCheckout as CheckoutIcon
} from '@mui/icons-material';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";


// Demo Component with sample data
const Cart: React.FC = () => {
  const {items: cartItems, numberOfItems} = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }))
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Use useMemo for totalPrice calculation
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.cartQuantity,
        0
      ),
    [cartItems]
  );

  return (
    <>
      <HeaderComponent cartItemCount={numberOfItems} title={'SHOPPING CART'} isClearCartVisible={true} />
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ minHeight: '400px' }}>
        {cartItems?.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: 'grey.50'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <ShoppingCartIcon
                sx={{
                  fontSize: 80,
                  color: 'grey.400',
                  mb: 2
                }}
              />
            </Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ color: 'grey.700' }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'grey.600' }}
            >
              Add some items to get started!
            </Typography>
          </Paper>
        ) : (
          <Box>
            {/* Cart Items */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              {cartItems?.map((item: CartItem) => (
                <CartCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Cart Summary */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'primary.50'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main'
                  }}
                >
                  Total: ₹{totalPrice.toFixed(2)}
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CheckoutIcon />}
                  onClick={() => navigate('/track-order')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
    </>
  );
};

export default Cart;