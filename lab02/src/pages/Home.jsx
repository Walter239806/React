import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFetch } from '../hooks/Fetch';

export default function Page() {
	const { data, isLoading, isError, runFetch } = useFetch();

	useEffect(() => {
		runFetch(`http://20.228.195.178:3001/post/readAll`);
	}, []);

	const List = () => {
		return data.map((i) => {
			return (
				<ListGroup.Item key={i._id}>
					<Card>
						<Card.Title>{i.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{i.author}
						</Card.Subtitle>
						<Card.Body>{i.createdAt}</Card.Body>
					</Card>
				</ListGroup.Item>
			);
		});
	};

	return (
		<>
			{isError && <div>Ha ocurrido un error</div>}
			<Form>
				<Form.Group>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<ListGroup>
							<List />
						</ListGroup>
					)}
				</Form.Group>
			</Form>
		</>
	);
}
