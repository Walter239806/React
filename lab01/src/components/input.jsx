import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
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
			{
				message && <button onClick={() => handleClick()}>Cambiar<FontAwesomeIcon icon={faBolt}></FontAwesomeIcon></button>

			}
			
		</div>
	);
};

Input.propTypes={
	titleChange: PropTypes.func.isRequired
}

export default Input;
