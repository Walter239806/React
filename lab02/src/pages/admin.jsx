import React, { useEffect, useMemo, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Session';
import { useFetch } from '../hooks/Fetch';
import DataTable from '../components/dataTable';
import Alert from '../components/loginAlert';
import InputGroup from 'react-bootstrap/InputGroup';

import useAxios from '../hooks/Axios';

export default function Page() {
	const navigate = useNavigate();
	const { session } = useAuth();
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(true);
	const { data, isLoading, isError, runFetch } = useFetch();
	const [datafiltered, setDataFiltered] = useState([]);
	// const { data, isLoading, isError, runAxiosGet } = useAxios();

	const rowClick = (row) => {
		navigate(`/item/id:${row}`);
	};

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

	const Table = () => {
		return (
			<>
				<Form.Control
					placeholder="Search by title"
					type="text"
					id="search"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<DataTable columns={columns} data={datafiltered} rowClick={rowClick} />
			</>
		);
	};

	useEffect(() => {
		runFetch(`http://20.228.195.178:3001/post/readAll`);
	}, [session]);

	useEffect(() => {
		if (searchValue.length >= 3) {
			return setDataFiltered(
				data.filter((i) => i.title.toLowerCase() === searchValue.toLowerCase())
			);
		}
		setDataFiltered(data);
	}, [searchValue, data]);

	return (
		<>
			{isLoading ? <h1>Loading...</h1> : session?.state ? <Table /> : <Alert />}
		</>
	);
}
