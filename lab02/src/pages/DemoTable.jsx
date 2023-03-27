import React, { Fragment, useState, useMemo } from 'react';
import { useFetch } from '../hooks/Fetch';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

export default function DemoTable() {
	const [query, setQuery] = useState('');
	const { data, isLoading, isError, runFetch } = useFetch({ hits: [] });

	const columns = useMemo(() => [{ Header: 'Title', accessor: 'title' }], []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data: data.hits,
			},
			useSortBy
		);

	const search = () => {
		runFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
	};

	const List = () => {};
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
				<Form.Group>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<Styles>
							<table {...getTableProps}>
								<thead>
									{headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column) => (
												<th
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
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
													console.log('ROOOOW', cell);
													return (
														<td {...cell.getCellProps()}>
															{cell.render('Cell')}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</Styles>
					)}
				</Form.Group>
			</Form>
		</Fragment>
	);
}
