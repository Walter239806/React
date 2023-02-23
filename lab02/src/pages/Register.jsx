import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Page() {
	const navigate = useNavigate();
	return (
		<>
			<Card className="m-auto" style={{ width: '20rem' }}>
				<Card.Body>
					<Card.Title>Register</Card.Title>
					<Form>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Fullname</Form.Label>
							<Form.Control placeholder="Enter your full name" />
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							onClick={() => navigate('/login')}
						>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
