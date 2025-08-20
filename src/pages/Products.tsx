import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/slices/products";
import HeaderComponent from "../components/Header";
import { Box, CircularProgress } from "@mui/material";
import ProductDetailModal from "../components/ProductDetailModal";
import { useState } from "react";

function Products() {
  const { numberOfItems } = useSelector((state: any) => state.cart);
  const { data: products, isLoading } = useGetProductsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState(0)

  const handleProductDetail = (productId: number) => {
    setModalOpen(!modalOpen);
    setProductId(productId)
  }

  const handleClose =()=>{
    setModalOpen(false)
    setProductId(0)
  }
  

  if (isLoading) {
    return (
      <Box style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!products) return <Box>NO PRODUCTS</Box>;
  return (
    <Box>
      <HeaderComponent
        cartItemCount={numberOfItems}
        title={"SHOP"}
        isClearCartVisible={false}
      />

      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: 'center',
          justifyContent: 'center',
          gap: "16px",
          padding: "16px",
        }}
      >
        {products?.map((product: any) => (
          <ProductCard key={product.id} product={product} handleProductDetail={handleProductDetail}/>
        ))}
      </Box>
      <ProductDetailModal
        open={modalOpen}
        onClose={handleClose}
        productId={productId}
      />
    </Box>
  );
}

export default Products;
