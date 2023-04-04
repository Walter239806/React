import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/Session';
import Alert from '../components/loginAlert';

export default function Item() {
	const { session } = useAuth();
	const { id } = useParams();

	return <>{session?.state ? <div>Item:{id}</div> : <Alert />}</>;
}
