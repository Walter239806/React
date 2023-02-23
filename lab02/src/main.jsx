import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Admin from './pages/admin';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ProvideAuth } from './context/Session';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ProvideAuth>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="register" element={<Register />}></Route>
					<Route path="login" element={<Login />}></Route>
					<Route path="admin" element={<Admin />}></Route>

					<Route
						path="*"
						element={
							<main>
								<p>Error 404. PAGE NOT FOUND</p>
							</main>
						}
					></Route>
				</Route>
			</Routes>
		</ProvideAuth>
	</BrowserRouter>
);
