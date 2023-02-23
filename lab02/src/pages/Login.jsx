import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function Page() {
	const navigate = useNavigate();
	return (
		<>
			<Card className="m-auto" style={{ width: '20rem' }}>
				<Card.Body>
					<Card.Title>Login</Card.Title>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter Email" />
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Enter Password" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>{' '}
						<Button
							variant="secondary"
							type="submit"
							onClick={() => navigate('/register')}
						>
							Register
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
