import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import './App.css';
import ButtonCreate from './components/button';
import InputTitle from './components/input';
import PageTitle from './components/title';
import { useLocalStorage } from './customHooks/useLocalStorage';

const Counter = ({ title, name }) => {
	const [count, setCount] = useLocalStorage("counter", 0) // useState(0);
	const [useName, setName] = useState('Walter');
	const [titulo, setTitle] = useState('');

	useEffect(() => {
		const message= localStorage.getItem('message')
		setTitle(message)
	}, []);

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

	const reset = () =>{


		setCount(0)
		setTitle("Contador reiniciado")


	}

	onCountChange.propTypes = {

		value: PropTypes.number
	
	}

	// const demoValue=5; 

	// ternary operator ? primer valor es verdadero y : es el else
	// const result = demoValue < 5 ? 'el valor es menor a 5' : 'el valor es mayor a 5'

	// const result= demoValue > 5 && "El valor es mayor a 5"

	return (
		<div className="App">
			<header className="App-header">
				
				<PageTitle title={titulo} count={count}></PageTitle>
			</header>
			<p> count: {count}</p>
			<p> name: {useName}</p>
			{

				count > 1 && <ButtonCreate title="Menos" onCountChange={onCountChange} count={count}></ButtonCreate>

			}
		
			<ButtonCreate
				title="Mas"
				onCountChange={onCountChange}
				count={count}
			></ButtonCreate>
			<InputTitle titleChange={titleChange}></InputTitle>

			{/*  Ternary - Conditional rendering */}

			{
				count > 5 ? <h4>El valor es mayor a 5</h4> : <h4>El valor es menor a 5</h4>
			}

				{/* && operator*/}

			{
			 
			 count > 10 && <FontAwesomeIcon icon={faBomb} onClick={reset}></FontAwesomeIcon>

			}
			<footer></footer>

		</div>
	);
};

export default Counter;

