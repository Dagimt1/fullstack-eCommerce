import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { AuthContext } from '../AuthContext';
import './styles.css'; // Import the stylesheet

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const user = auth ? JSON.parse(atob(auth.split('.')[1])) : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product List</h2>
        <div>
          <Link to="/cart">
            My Cart <Badge bg="secondary">{cartItemCount}</Badge>
          </Link>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><img src={product.image_url} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <Button onClick={() => addToCart(product)} variant="primary" size="sm" className="me-2">Add to Cart</Button>
                {user && user.is_admin && (
                  <>
                    <Button as={Link} to={`/update/${product.id}`} variant="warning" size="sm" className="me-2">Edit</Button>
                    <Button variant="danger" size="sm">Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
