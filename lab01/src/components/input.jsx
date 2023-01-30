import { useState } from 'react';

const Input = ({ titleChange }) => {

	const [message, setMessage] = useState('')

	const handleChange = () => {
		// eslint-disable-next-line no-restricted-globals
		setMessage(event.target.value)
	};

	const handleClick=()=>{
		
	titleChange(message)

	}

	return (
		<div>
			<p>Title change:</p>
			<input onChange={handleChange}></input>
			<button onClick={() => handleClick()}>Cambiar</button>
		</div>
	);
};

export default Input;
