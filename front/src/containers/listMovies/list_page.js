import React, { useState, useEffect } from 'react';
import OptionMenu from './option';
import listFilm from './listFilm';

export default function ListPage(query, setQuery) {
	const [favorites, setFavorites] = useState(['empty']);

	useEffect(() => {
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/getFavorites`, {
			method: 'GET',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			setFavorites(parsedData.favorites);
		})
	}, [])

	return (
		<div className="home-page">
			{OptionMenu(setQuery)}
			{listFilm(query, setQuery, favorites)}
		</div>
	)
}
