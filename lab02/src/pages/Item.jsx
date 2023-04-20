import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/Session';
import Alert from '../components/loginAlert';
import Card from 'react-bootstrap/Card';
import { useFetch } from '../hooks/FetchPost';

export default function Item() {
	const { session } = useAuth();
	const { id } = useParams();
	const { data, isLoading, isError, runFetch } = useFetch();
	const [i, setI] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setI(id.substring(3));
	}, [id]);

	const fetchRun = async () => {};

	useEffect(() => {
		console.log(loading);
		runFetch(`http://20.228.195.178:3001/post/readByID`, i).then(
			setLoading(false)
		);
	}, [session, data]);

	const CardItem = () => {
		return (
			<Card bg="dark" text="white">
				<Card.Title>{data.title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{data.author}</Card.Subtitle>
				<Card.Body>{data.createdAt}</Card.Body>
			</Card>
		);
	};

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : session?.state ? (
				<CardItem></CardItem>
			) : (
				<Alert />
			)}
		</>
	);
}
