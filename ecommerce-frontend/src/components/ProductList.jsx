import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

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

  const handleSortChange = (e) => {
    setSort(e.target.value);
    // Implement sorting logic here
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Implement filtering logic here
  };

  return (
    <div>
      <h2>Product List</h2>
      <Form className="mb-3">
        <Form.Group controlId="sort">
          <Form.Label>Sort by</Form.Label>
          <Form.Control as="select" value={sort} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="filter" className="mt-3">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control type="text" value={filter} onChange={handleFilterChange} placeholder="Enter category" />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
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
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <Button as={Link} to={`/products/${product.id}`} variant="info" size="sm" className="me-2">View</Button>
                <Button as={Link} to={`/update/${product.id}`} variant="warning" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
