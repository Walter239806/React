import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Session';

export default function Page() {
	const navigate = useNavigate();
	const { session } = useAuth();

	return (
		<>
			{session?.state ? (
				<div>Admin: {session.username}</div>
			) : (
				<Card className="m-auto" style={{ width: '20rem' }}>
					<Card.Body>
						<Card.Title>No autorizado 😁</Card.Title>
						<Card.Text>Debe registrarse para acceder a esta pagina</Card.Text>
						<Button onClick={() => navigate('/login')}>Login</Button>
					</Card.Body>
				</Card>
			)}
		</>
	);
}
