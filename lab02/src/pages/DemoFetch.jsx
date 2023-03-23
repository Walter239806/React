import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const App = () => {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	// const [url, setUrl] = useState('');

	const search = async () => {
		const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
		const result = await fetch(url).then((res) => res.json());

		setData(result.hits);

		console.log('result', result);
	};

	const List = () =>
		data.map((i) => (
			<ListGroup.Item key={i.objectID}>
				<a target="_blank" href={i.url}>
					{i.title}
				</a>
			</ListGroup.Item>
		));

	//TODO: mejorar con boostrap
	return (
		<Fragment>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Search</Form.Label>
					<Form.Control
						type="text"
						placeholder="Search Here"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="button" onClick={() => search()}>
					search
				</Button>
				<Form.Group>
					<ListGroup>
						<List />
					</ListGroup>
				</Form.Group>
			</Form>
		</Fragment>
	);
};

export default App;
