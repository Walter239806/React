import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/Session';

export default function Page() {
	const navigate = useNavigate();
	const [validated, setValidated] = useState();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullname, setFullname] = useState('');
	const { create } = useAuth();

	const validatePassword = (password) => {
		const validate =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return validate.test(password);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'email') setEmail(value);
		if (name === 'password') setPassword(value);
		if (name === 'fullname') setFullname(value);
	};

	const register = (e) => {
		e.preventDefault();
		console.log(password);
		console.log(validatePassword(password));
		if (!validatePassword(password)) {
			alert("Password doesn't met the criteria");
			return;
		} else {
			const form = e.currentTarget;
			if (form.checkValidity() === false) {
				e.stopPropagation();
				return;
			}
			setValidated(true);

			create({
				email,
				password,
				fullname,
			});
			navigate('/login');
		}
	};

	return (
		<>
			<Card className="m-auto" style={{ width: '20rem' }}>
				<Card.Body>
					<Card.Title>Register</Card.Title>
					<Form noValidate validated={validated} onSubmit={register}>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									name="email"
									value={email}
									type="email"
									placeholder="Enter email"
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									name="password"
									value={password}
									type="password"
									placeholder="Password"
									onChange={handleChange}
								/>
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Fullname</Form.Label>
							<Form.Control
								required
								name="fullname"
								value={fullname}
								type="text"
								placeholder="Enter your full name"
								onChange={handleChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
