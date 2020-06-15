import React, { useState, useEffect } from 'react';
import PutFilm from '../../components/Display/PutFilm';
import TypeSearch from '../../components/Input/TypeSearch';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style';
import api from '../../api/api'

const Homepage = styled.div`
	display: flex;
	justify-content: space-around;
`
const Text = styled.div`
	display: flex;
	justify-content: center;
	color: ${COLORS.WHITE};
`


export default function FavoritesMovies() {
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue') + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	const [type, setType] = useState('movie');
	const [favorites, setFavorites] = useState([]);
	const [film, setFilm] = useState([]);

	useEffect(() => {
		setFilm([]);
		var fav;
		api.get('/movie/favorites')
		.then((res) => {
			let fav = []
			for(let i = 0; res.data[i] !== undefined; i++) {
				if (res.data[i].type === type)
					fav[i] = res.data[i].movie;
			} 
			setFavorites(fav);
			var tab = [];
			fav.forEach(element => {
				const url = 'https://api.themoviedb.org/3/' + type + '/' + element + '?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue')
				fetch(url, {
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
				}).then((response) => {
					if (response.ok) {
						return response.json();
					}
				}).then((parsedData) => {
					if (parsedData !== undefined) {
						tab[0] = parsedData;
						setFilm(prevFilm => {
							return [...new Set([...prevFilm, ...tab])]
						});
					}
				});
			})
		})
		.catch((err) => {
			console.log(err)
		})
	}, [type]);

	if (favorites.length === 0) {
		return (
			<div>
				{ TypeSearch(type, setType, setQuery, query) }
				<Text>You don't have favorite movie!</Text>
			</div>
		)
	} else {
		return (
			<div>
				{ TypeSearch(type, setType, setQuery, query) }
				<Homepage>
					{PutFilm(film, favorites, type)}
				</Homepage>
			</div>
		)
	}
}