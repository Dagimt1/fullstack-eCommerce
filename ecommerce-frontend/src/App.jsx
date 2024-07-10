import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/add" element={<PrivateAdminRoute element={AddProduct} />} />
              <Route path="/update/:id" element={<PrivateAdminRoute element={UpdateProduct} />} />
              <Route path="/cart" element={<PrivateRoute element={Cart} />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
