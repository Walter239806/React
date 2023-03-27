import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFetch } from '../hooks/FetchPost';

const App = () => {
	const [query, setQuery] = useState('');
	const { data, isLoading, isError, runFetch } = useFetch();

	const search = async () => {
		const url = `http://20.228.195.178:3001/post/readByID`;
		// const result = await fetch(url, {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({
		// 		_id: query,
		// 	}),
		// }).then((res) => res.json());

		// setValue(result);

		// console.log('result', result);
		// console.log(value);
		runFetch(url, query);
	};

	const Reply = () => {
		// const arr = Object.keys(value);
		// // console.log(arr);
		// arr.map((i) => (
		// 	<ListGroup.Item key={i.objectID}>
		// 		<a target="_blank" href={i.url}>
		// 			{i.title}
		// 		</a>
		// 	</ListGroup.Item>
		// ));

		return (
			<ListGroup.Item>
				<Card>
					<Card.Title>{data.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						{data.author}
					</Card.Subtitle>
					<Card.Body>{data.body}</Card.Body>
				</Card>
			</ListGroup.Item>
		);
	};

	return (
		<>
			<Card className="m-auto" style={{ width: '40rem' }}>
				<Card.Body>
					<Card.Title>Search Post</Card.Title>
					<InputGroup className="mb-3">
						<Button
							variant="outline-secondary"
							type="button"
							onClick={() => search()}
						>
							Search Here
						</Button>
						<Form.Control
							type="text"
							placeholder="Search Here"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							aria-describedby="basic-addon3"
						/>
					</InputGroup>
					{data === [] ? (<div>holaaaa</div>) : (
					<ListGroup>
						<Reply />
					</ListGroup>
					)}
				</Card.Body>
			</Card>
		</>
	);
};

export default App;
