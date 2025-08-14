import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../redux/slices/products";
import type { AppDispatch } from "../redux/store";
import HeaderComponent from "../components/Header";
import { CircularProgress } from "@mui/material";
function Products() {
  const dispatch = useDispatch<AppDispatch>();
    const { numberOfItems}= useSelector((state: any) => state.cart);
  const { items: products, status } = useSelector((state: any) => state.products);

  useEffect(() => {
    if(!products.length){
    dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <CircularProgress />
      </div>
    )
  }

  if(!products) return <div>NO PRODUCTS</div>;
  return <div style={{paddingLeft: '16px'}}>
    <HeaderComponent cartItemCount={numberOfItems} title={'SHOP'} isClearCartVisible={false} />

   <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px'}}>
    {products?.map((product: any) => (
      <ProductCard key={product.id} product={product}/>
    ))}
  </div>
  </div>;
}

export default Products;
