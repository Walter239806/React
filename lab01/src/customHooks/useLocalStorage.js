import { useEffect, useState } from 'react';

export const useLocalStorage = (storageKey, defaultValue) => {
	console.log('Holaaaaaaaaaaaa', storageKey, defaultValue);

	const [value, setValue] = useState(
		Number(localStorage.getItem(storageKey) || defaultValue)
	);

	useEffect(() => {
		console.log('Custom hook !!!');
		localStorage.setItem(storageKey, value);
	}, [value, storageKey]);

	return [value, setValue];
};
