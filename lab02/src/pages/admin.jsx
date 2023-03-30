import React, { useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { useAuth } from '../context/Session';
import { useFetch } from '../hooks/Fetch';
import DataTable from '../components/dataTable';

export default function Page() {
	const navigate = useNavigate();
	const { session } = useAuth();
	const { data, isLoading, isError, runFetch } = useFetch();

	const rowClick = (row) => console.log('Hola');

	const columns = useMemo(
		() => [
			{
				Header: 'Post',
				columns: [
					{
						Header: 'ID',
						accessor: '_id',
					},
					{
						Header: 'Title',
						accessor: 'title',
					},
					{
						Header: 'Author',
						accessor: 'author',
					},
					{
						Header: 'Created At',
						accessor: 'createdAt',
					},
				],
			},
		],
		[]
	);

	useEffect(() => {
		runFetch(`http://20.228.195.178:3001/post/readAll`);
	}, []);

	return (
		<>
			{session?.state ? (
				<DataTable columns={columns} data={data} rowClick={rowClick} />
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
