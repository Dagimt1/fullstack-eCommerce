import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';

const Navigation = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">eCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {auth && JSON.parse(atob(auth.split('.')[1])).is_admin && <Nav.Link as={Link} to="/add">Add Product</Nav.Link>}
          </Nav>
          <Nav>
            {auth ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  My Cart <Badge bg="secondary">{cartItemCount}</Badge>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
