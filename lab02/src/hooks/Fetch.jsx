import { useEffect, useState } from 'react';
import { useAuth } from '../context/Session';
import toast from 'react-hot-toast';

export const useFetch = (initialData = []) => {
	const [data, setData] = useState(initialData);
	// const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const { session } = useAuth();

	const runFetch = async (url) => {
		if (session) {
			setIsLoading(true);
			setIsError(false);
			try {
				const result = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${session.token}`,
					},
				}).then((res) => res.json());
				console.log('Bearer  😊😊😊', result);
				setData(result);
			} catch (error) {
				setIsError(true);
				console.error('error', error);
			}
			setIsLoading(false);
		} else {
			return toast.error('You have to sign in');
		}
	};

	// useEffect(() => {
	// 	if (url) {
	// 		runFetch();
	// 	}
	// }, [url]);
	return { data, isLoading, isError, runFetch };
};
