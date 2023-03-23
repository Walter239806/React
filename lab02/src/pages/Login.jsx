import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../context/Session';
import toast from 'react-hot-toast';

export default function Page() {
	const [validated, setValidated] = useState();
	const [email, setEmail] = useState('a@test1.com');
	const [password, setPassword] = useState('Welcome123456!');
	const navigate = useNavigate();
	const { session, signIn, onError, errorMessage } = useAuth();

	const login = (e) => {
		e.preventDefault();

		//Validations
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			return;
		}

		setValidated(true);

		//API call
		signIn({
			email,
			password,
		});
		// .catch((error) => {
		// 	// toast.error(error.toString());
		// 	console.log('error', error);
		// 	setOnError(true);
		// 	setErrorMessage(error.toString());
		// });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name);
		// console.log(value);

		if (name === 'email') setEmail(value);
		if (name === 'password') setPassword(value);
	};

	return (
		<>
			<Card className="m-auto" style={{ width: '20rem' }}>
				<Card.Body>
					<Card.Title>Login</Card.Title>
					<Form onSubmit={login} noValidate validated={validated}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								name="email"
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={handleChange}
							/>
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								name="password"
								type="password"
								placeholder="Enter Password"
								value={password}
								onChange={handleChange}
							/>
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
				<Card.Footer>{onError && errorMessage}</Card.Footer>
			</Card>
		</>
	);
}
