import { PropTypes } from "prop-types";
import { useState } from 'react';

const ButtonCreate = ({ title, onCountChange, count }) => {
	const onHandleChange = () => {
		if (title === 'Mas') count += 1;
		else if (count > 0) count -= 1;
		onCountChange(count);
	};

	return <button onClick={() => onHandleChange()}>{title}</button>;
};

ButtonCreate.propTypes = {

	title: PropTypes.string,
	onCountChange: PropTypes.func,
	count: PropTypes.number,

}



export default ButtonCreate;

