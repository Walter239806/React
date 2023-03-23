import { useState, memo, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
	console.log('Render APP');
	const [text, setText] = useState('');
	const [users, setUsers] = useState([
		{ id: 'a', name: 'Carlos' },
		{ id: 'b', name: 'Walter' },
	]);

	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	const generateString = (length) => {
		let result = ' ';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	};

	useEffect(() => {
		const list = [];
		for (let index = 0; index < 11; index++) {
			list.push({ id: uuidv4(), name: generateString(5) });
		}
		setUsers(list);
		console.log('Initial render ✅');
	}, []);

	const handleRemove = useCallback(
		(id) => {
			setUsers(users.filter((user) => user.id !== id));
		},
		[users] 
	);

	const handleText = (e) => {
		setText(e.target.value);
	};

	const handleAddUser = () => {
		setUsers([{ id: uuidV4(), name: text }, ...users]);
		console.log(users);
	};

	return (
		<div>
			<input type="text" value={text} onChange={handleText}></input>
			<button type="button" onClick={handleAddUser}>
				Add User
			</button>

			<List list={users} onRemove={handleRemove} />
		</div>
	);
};

const List = memo(({ list, onRemove }) => {
	console.log('Render LIST');
	console.log('list', list);
	return (
		<ul>
			{list.map((item) => {
				return <ListItem key={item.id} item={item} onRemove={onRemove} />;
			})}
		</ul>
	);
});

const ListItem = ({ item, onRemove }) => {
	console.log('Render LIST ITEM');
	console.log(item);
	return (
		<li>
			{item.name}
			<button type="button" onClick={() => onRemove(item.id)}>
				X
			</button>
		</li>
	);
};

export default App;
