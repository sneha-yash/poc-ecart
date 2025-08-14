import React from "react";
import HeaderComponent from "../components/Header";

const NotFound: React.FC = () => (
  <>
  <HeaderComponent title={'NOT FOUND'}/>
  <div style={{ textAlign: "center", marginTop: "80px" }}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
  </>
);

export default NotFound;