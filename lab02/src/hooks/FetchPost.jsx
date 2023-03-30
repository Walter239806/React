import { useEffect, useState } from 'react';
import { useAuth } from '../context/Session';
import toast from 'react-hot-toast';

export const useFetch = (initialData = []) => {
	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const { session } = useAuth();

	const runFetch = async (url, query) => {
		if (session) {
			setIsLoading(true);
			setIsError(false);
			try {
				const result = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${session.token}`,
					},
					body: JSON.stringify({
						_id: query,
					}),
				}).then((res) => res.json());
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
