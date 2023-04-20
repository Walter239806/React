import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Session';
import axios from 'axios';

const useAxios = (initialData = []) => {
	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const { session } = useAuth();

	const apiClient = axios.create({
		baseURL: 'http://20.228.195.178:3001',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.token}`,
			'Access-Control-Allow-Origin-': '*',
			Accept: '*/*',
		},
		timeout: 30000,
	});

	// apiClient.interceptors.request.use((request) => {
	// 	if (session.token)
	// 		request.headers.Authorization = `Bearer ${session.token}`;
	// });

	// apiClient.interceptors.response.use((response) => {
	// 	if (response.data.erros) console.log('err', response);
	// });

	const runAxiosGet = async (url, query) => {
		setIsLoading(true);
		setIsError(false);
		apiClient
			.get(url) //demo de get con axios
			.then((response) => {
				console.log('response', response);
				setData(response.data);
			})
			.catch((error) => {
				setIsError(true);
				toast.error(error.response.data.errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	return { data, isLoading, isError, runAxiosGet };
};

export default useAxios;
