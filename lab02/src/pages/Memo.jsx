import { useState, memo } from 'react';
import { v4 as uuidV4 } from 'uuid';

const App = () => {
	console.log('Render APP');
	const [text, setText] = useState('');
	const [users, setUsers] = useState([
		{ id: 'a', name: 'Carlos' },
		{ id: 'b', name: 'Walter' },
	]);

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

			<List list={users} />
		</div>
	);
};

const List = memo(({ list }) => {
	console.log('Render LIST');
	console.log('list', list);
	return (
		<ul>
			{list.map((item) => {
				return <ListItem key={item.id} item={item} />;
			})}
		</ul>
	);
});

const ListItem = ({ item }) => {
	console.log('Render LIST ITEM');
	console.log(item);
	return <li>{item.name}</li>;
};

export default App;
