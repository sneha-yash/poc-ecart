import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import OrderTracking from './pages/OrderTracking';
// Dummy components for Products and Cart

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">          
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
