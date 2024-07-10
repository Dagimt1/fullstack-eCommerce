import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Table, Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <Button onClick={() => increaseQuantity(item.id)} variant="success" size="sm" className="me-2">+</Button>
                <Button onClick={() => decreaseQuantity(item.id)} variant="warning" size="sm" className="me-2">-</Button>
                <Button onClick={() => removeFromCart(item.id)} variant="danger" size="sm">Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: ${getTotalPrice()}</h3>
      <Button variant="primary">Checkout</Button>
    </div>
  );
};

export default Cart;
