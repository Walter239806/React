import { createContext, useState, useContext } from 'react';

const authContext = createContext({});

export const useAuth = () => {
	return useContext(authContext);
};

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
	const [session, setSession] = useState(null);
	const signIn = async ({ email, password }) => {
		console.log('Sing in', email, password);
		const data = await fetch('http://20.228.195.178:3001/user/JWT', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: email,
				password,
			}),
		}).then((res) => {
			return res.json();
		});
		console.log(data);

		if (data.error) throw Error(data.error);

		localStorage.setItem('token', JSON.stringify(data.accessToken));
	};

	const create = async ({ email, password, fullname }) => {
		const data = await fetch('http://20.228.195.178:3001/user/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: email,
				password,
				fullname,
			}),
		}).then((res) => {
			return res.json();
		});
		console.log(data);
	};

	return { session, signIn, create };
};
