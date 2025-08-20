import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderProps, NavigationItem } from "../interfaces/header.type";
import { clearCart } from "../redux/slices/cart";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
} from "@mui/icons-material";

const HeaderComponent: React.FC<HeaderProps> = ({
  title = "Shop",
  isClearCartVisible = false,
  cartItemCount = 3,
  onCategoryClick,
  onNavigationClick,
}) => {
  const [productsMenuOpen, setProductsMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleProductsMenuToggle = (): void => {
    setProductsMenuOpen(!productsMenuOpen);
  };

  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryClick = (category: string): void => {
    setProductsMenuOpen(false);
    if (onCategoryClick) {
      onCategoryClick(category);
    }
    console.log(`Category clicked: ${category}`);
  };

  const handleNavigationClick = (item: string, link: string): void => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    if (onNavigationClick) {
      onNavigationClick(item);
    }
    navigate(link);
  };

  const handleCartClick = (): void => {
    navigate("/cart");
  };

  const productCategories: string[] = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Books",
    "Sports",
    "Beauty",
  ];

  const navigationItems: NavigationItem[] = [
    { label: "Home", icon: "🏠", link: "/" },
    { label: "About", icon: "ℹ️", link: "/about" },
    { label: "Contact", icon: "📞", link: "/contact" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            <StoreIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="h1" sx={{ flexGrow: 0 }}>
              {title}
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => handleNavigationClick("Home", "/")}
              >
                Products
              </Button>

              <Button
                color="inherit"
                startIcon={<InfoIcon />}
                onClick={() => handleNavigationClick("About", "/about")}
              >
                About
              </Button>

              <Button
                color="inherit"
                startIcon={<PhoneIcon />}
                onClick={() => handleNavigationClick("Contact", "/contact")}
              >
                Contact
              </Button>
            </Box>
          )}

          {/* Cart Button */}
          {isClearCartVisible && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => dispatch(clearCart())}
              sx={{ mr: 1 }}
            >
              Clear Cart
            </Button>
          )}

          <IconButton
            color="inherit"
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Menu</Typography>
        </Box>

        <List>
          {navigationItems.map((item, index) => (
            <ListItem
              component="button"
              key={index}
              onClick={() => handleNavigationClick(item.label, item.link)}
            >
              <ListItemIcon>
                {item.label === "Products" && <HomeIcon />}
                {item.label === "About" && <InfoIcon />}
                {item.label === "Contact" && <PhoneIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </Drawer>
    </>
  );
};

export default HeaderComponent;
