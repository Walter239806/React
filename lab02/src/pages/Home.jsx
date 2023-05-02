import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { postStore } from '../store/zu-post';
// import { useFetch } from '../hooks/Fetch';
// import { setNum, readAll } from '../store/postSlice';
// import { useSelector, useDispatch } from 'react-redux';

export default function Page() {
	// CUSTOM HOOK DEMO:
	// const { data, isLoading, isError, runFetch } = useFetch();

	//REDUX DEMO:

	// const { num } = useSelector((state) => state.postSlice);

	// const dispatch = useDispatch();

	// const {
	// 	isLoading,
	// 	isError,
	// 	errorMessage,
	// 	list: data,
	// } = useSelector((state) => state.postSlice);

	// ZUSTAND DEMO:
	const { list: data, isLoading, isError, readAll } = postStore();

	useEffect(() => {
		//Hook demo:
		// runFetch(`http://20.228.195.178:3001/post/readAll`);

		//Redux demo:
		// dispatch(setNum(3));
		// dispatch(readAll());

		//Zustand demo:
		readAll();
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
			{/* {isError && <div>{errorMessage}</div>} */}
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
