import React, { useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { useAuth } from '../context/Session';
import { useFetch } from '../hooks/Fetch';

const Styles = styled.div`
	padding: 1rem;

	table {
		thead {
			background-color: #7c9eae70;
		}

		border-spacing: 0;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}

			cursor: pointer;
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid #00000017;

			:last-child {
				border-right: 0;
			}
		}
	}
`;

export default function Page() {
	const navigate = useNavigate();
	const { session } = useAuth();
	const { data, isLoading, isError, runFetch } = useFetch();

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

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		);

	useEffect(() => {
		runFetch(`http://20.228.195.178:3001/post/readAll`);
	}, []);

	return (
		<>
			{session?.state ? (
				<Styles>
					<table {...getTableProps}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{column.render('Header')}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row);

								return (
									<tr
										{...row.getRowProps()}
										onClick={() => sendRowClick(row.original._id)}
									>
										{row.cells.map((cell) => {
											return (
												<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</Styles>
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
