import { useEffect, useState } from 'react';
import './App.css';
import ButtonCreate from './components/button';
import PageTitle from './components/title';
import InputTitle from './components/input';

const Counter = ({ title, name }) => {
	const [count, setCount] = useState(0);
	const [useName, setName] = useState('Walter');
	const [titulo, setTitle] = useState(title);

	useEffect(() => {
		console.log('hello');
	}, []);

	useEffect(() => {
		console.log('counter changes', count);
	}, [count]);

	useEffect(() => {
		if (count === 1) console.log('cambio a 1');
	}, [count]);

	useEffect(() => {
		return () => {
			console.log('bye');
		};
	}, []);

	const onCountChange = (value) => {
		console.log('value:', value);
		setCount(value);
	};

	const titleChange = (newTitle) => {
		setTitle(newTitle);
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
