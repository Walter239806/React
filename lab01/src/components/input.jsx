import { useState } from 'react';

const Input = ({ titleChange }) => {
	const changeTitle = () => {
		const value = document.getElementById('newTitulo');
		if (value === null) titleChange(null);
		titleChange(value);
	};

	return (
		<div>
			<p>Title change:</p>
			<input id="newTitulo"></input>
			<button onClick={() => changeTitle()}>Cambiar</button>
		</div>
	);
};

export default Input;
