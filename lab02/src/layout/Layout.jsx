import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Nav className="me-auto">
						<Navbar.Brand>
							<img src="/src/assets/react.svg" alt="react" />
						</Navbar.Brand>
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/login">
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/admin">
							<Nav.Link>Admin</Nav.Link>
						</LinkContainer>
					</Nav>
				</Container>
			</Navbar>
			<Container className="mt-3 h-100">
				<Outlet />
			</Container>
		</>
	);
}
