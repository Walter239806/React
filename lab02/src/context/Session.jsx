import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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
	const [onError, setOnError] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getSession();
	}, []);

	const login = async ({ email, password }, navigate) => {
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
		if (data.error) throw Error(data.error);
		localStorage.setItem('token', data.accessToken);

		//set session
		getSession();

		navigate('/admin');

		return true;
	};

	const getSession = () => {
		const token = localStorage.getItem('token');

		if (token) {
			const data = jwt_decode(token);
			console.log('dataaaa', data);

			const currentTime = new Date().getTime() / 1000;
			if (parseInt(currentTime) <= parseInt(data.exp))
				setSession({
					username: data.username,
					state: true,
					_id: data._id,
					token,
				});
			else {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}

		//refresh token ---> INVESTIGAR
	};

	const signIn = ({ email, password }) => {
		toast.promise(login({ email, password }, navigate), {
			loading: 'Logging...',
			success: 'Welcome 😍',
			error: (error) => {
				setErrorMessage(error.toString());
				setOnError(true);
				return <b>{error.toString()}</b>;
			},
		});
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
		console.log('DAAATAAA', data);
	};

	return { session, signIn, create, onError, errorMessage };
};
