import { useEffect, useState } from 'react';
import './App.css';
import ButtonCreate from './components/button';
import InputTitle from './components/input';
import PageTitle from './components/title';

const Counter = ({ title, name }) => {
	const [count, setCount] = useState(0);
	const [useName, setName] = useState('Walter');
	const [titulo, setTitle] = useState('');

	// useEffect(() => {
	// 	console.log('hello');
	// }, []);

	useEffect(() => {
		console.log('counter changes', count);
	}, [count]);

	// useEffect(() => {
	// 	if (count === 1) console.log('cambio a 1');
	// }, [count]);

	// useEffect(() => {
	// 	return () => {
	// 		console.log('bye');
	// 	};
	// }, []);

	useEffect(() => {
		console.log('title changes', titulo);
	}, [titulo]);

	const onCountChange = (value) => {
		console.log('value:', value);
		setCount(value);
	};

	const titleChange = (message) => {
		console.log("Se recibio del input:",message)
		setTitle(message);
		console.log("el titulo actual es", titulo)
	};

	return (
		<div className="App">
			<header className="App-header">
				<PageTitle title={titulo} count={count}></PageTitle>
			</header>
			<p> count: {count}</p>
			<p> name: {useName}</p>
			<ButtonCreate
				title="Menos"
				onCountChange={onCountChange}
				count={count}
			></ButtonCreate>
			<ButtonCreate
				title="Mas"
				onCountChange={onCountChange}
				count={count}
			></ButtonCreate>
			<InputTitle titleChange={titleChange}></InputTitle>
		</div>
	);
};

export default Counter;
