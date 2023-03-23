import { useState, memo, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
	console.log('Render APP');
	const [text, setText] = useState('');
	const [search, setSearch] = useState('');
	const [users, setUsers] = useState([
		{ id: 'a', name: 'Carlos' },
		{ id: 'b', name: 'Monica' },
		{ id: 'c', name: 'Marie' },
		{ id: 'd', name: 'Walter' },
		{ id: 'e', name: 'Jorge' },
		{ id: 'f', name: 'Hazel' },
		{ id: 'g', name: 'Olga' },
		{ id: 'h', name: 'Ignacio' },
		{ id: 'i', name: 'Fabian' },
		{ id: 'j', name: 'Priscilla' },
	]);

	// const characters =
	// 	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	// const generateString = (length) => {
	// 	let result = ' ';
	// 	const charactersLength = characters.length;
	// 	for (let i = 0; i < length; i++) {
	// 		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	// 	}

	// 	return result;
	// };

	// useEffect(() => {
	// 	const list = [];
	// 	for (let index = 0; index < 1001; index++) {
	// 		list.push({ id: uuidv4(), name: generateString(5) });
	// 	}
	// 	setUsers(list);
	// 	console.log('Initial render ✅');
	// }, []);

	const handleText = (e) => {
		setText(e.target.value);
	};

	const handleAddUser = () => {
		setUsers([{ id: uuidV4(), name: text }, ...users]);
		console.log(users);
	};

	const handleSearch = () => {
		setSearch(text);
	};

	const filter = useMemo(
		() =>
			users.filter((user) => {
				console.log('Filter function running');
				return user.name.toLowerCase().includes(search.toLocaleLowerCase());
			}),
		[search]
	);

	return (
		<div>
			<input type="text" value={text} onChange={handleText}></input>
			<button type="button" onClick={handleAddUser}>
				Add User
			</button>

			<button type="button" onClick={handleSearch}>
				Search
			</button>

			<List list={filter} />
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
