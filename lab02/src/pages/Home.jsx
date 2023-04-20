import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFetch } from '../hooks/Fetch';
import { setNum } from '../store/postSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Page() {
	const { data, isLoading, isError, runFetch } = useFetch();
	const { num } = useSelector((state) => state.postSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		runFetch(`http://20.228.195.178:3001/post/readAll`);
		console.log('setNum', num);
		dispatch(setNum(3));
	}, []);

	const List = () => {
		return data.map((i) => {
			return (
				<ListGroup.Item className="p-4" key={i._id}>
					{/* <h1>{num}</h1> */}
					<Card bg="dark" text="white">
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
						<ListGroup variant="flush">
							<List />
						</ListGroup>
					)}
				</Form.Group>
			</Form>
		</>
	);
}
