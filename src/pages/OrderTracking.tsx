import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cart";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  Inventory,
  ShoppingBag,
  Home,
  ShoppingCart,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { addOrder } from "../redux/slices/orders";

type OrderStatus =
  | "Ordered"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

interface OrderTrackingProps {
  currentStatus?: OrderStatus;
}

const steps: OrderStatus[] = [
  "Ordered",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

// Custom styled components
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-alternativeLabel': {
    top: 22,
  },
  '&.MuiStepConnector-active': {
    '& .MuiStepConnector-line': {
      background: theme.palette.primary.main,
    },
  },
  '&.MuiStepConnector-completed': {
    '& .MuiStepConnector-line': {
      background: theme.palette.success.main,
    },
  },
  '& .MuiStepConnector-line': {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 1,
  },
}));

const StepIconContainer = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    backgroundColor: ownerState.completed
      ? theme.palette.success.main
      : ownerState.active
        ? theme.palette.primary.main
        : theme.palette.grey[300],
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    ...(ownerState.active && {
      boxShadow: `0 4px 10px 0 ${theme.palette.primary.main}40`,
    }),
    ...(ownerState.completed && {
      boxShadow: `0 4px 10px 0 ${theme.palette.success.main}40`,
    }),
  })
);

// Step icons mapping
const stepIcons: { [index: string]: React.ReactElement } = {
  1: <ShoppingBag />,
  2: <Inventory />,
  3: <LocalShipping />,
  4: <LocalShipping />,
  5: <Home />,
};

function CustomStepIcon(props: any) {
  const { active, completed, className } = props;
  const icons = stepIcons;

  return (
    <StepIconContainer ownerState={{ completed, active }} className={className}>
      {completed ? <CheckCircle /> : icons[String(props.icon)]}
    </StepIconContainer>
  );
}

const OrderTracking: React.FC<OrderTrackingProps> = ({
  currentStatus = "Ordered",
}) => {
  const currentStep = steps.indexOf(currentStatus);
  const { items: cartItems, numberOfItems } = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinueShopping = () => {
    navigate('/');
    dispatch(clearCart());
    dispatch(addOrder({ numberOfItems: numberOfItems, totalQuantity: totalItems, totalAmount: totalAmount }));
  };

  // Calculate order summary
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.cartQuantity, 0);
  const totalAmount = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.cartQuantity), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Order Tracking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your order status and view order details
        </Typography>
      </Box>

      {/* Order Status Stepper */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
          Order Status
        </Typography>
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={<CustomStepConnector />}
          sx={{ mb: 2 }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < currentStep}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <Typography variant="body2" sx={{ fontWeight: index <= currentStep ? 'bold' : 'normal' }}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Current Status Chip */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Chip
            label={`Current Status: ${currentStatus}`}
            color={currentStatus === "Delivered" ? "success" : "primary"}
            variant="filled"
            size="medium"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Paper>

      {/* Order Summary */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShoppingCart color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                {totalItems}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShoppingBag color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                ₹{totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Order Status
              </Typography>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                {currentStatus}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Order Details */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBag color="primary" />
          Order Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No items in your order
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cartItems.map((item: any) => (
              <CartCard key={item.id} item={item} />
            ))}
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={handleContinueShopping}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderTracking;
