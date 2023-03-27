import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFetch } from '../hooks/Fetch';

const App = () => {
	// const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	// const [isLoading, setIsLoading] = useState(false);
	// const [isError, setIsError] = useState(false);
	// const [url, setUrl] = useState('');
	const { data, isLoading, isError, runFetch } = useFetch();

	const search = () => {
		runFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
		// setIsLoading(true);
		// setIsError(false);

		// try {
		// 	const result = await fetch(url).then((res) => res.json());
		// 	setData(result.hits);
		// } catch (error) {
		// 	setIsError(true);
		// 	console.error('error', error);
		// }

		// setIsLoading(false);
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
			{isError && <div>Ha ocurrido un error</div>}
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
				{data === null ? (
					<div></div>
				) : (
					<Form.Group>
						{isLoading ? (
							<div>Loading...</div>
						) : (
							<ListGroup>
								<List />
							</ListGroup>
						)}
					</Form.Group>
				)}
			</Form>
		</Fragment>
	);
};

export default App;
