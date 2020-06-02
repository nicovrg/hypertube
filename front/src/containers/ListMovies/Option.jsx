import React from 'react';
import Select from 'react-select';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style'
import { optionsGenre, optionsDate, optionsStars, optionsOrder } from './allOption';

const OptionContainer = styled.div `
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: stretch;
	margin: 10;
	background-color: ${COLORS.GREY_LOVE};
	height: 400px;
	margin-top: 5vw;
	margin-left: 3vw;
	border-radius: 5px;
	min-width: 180px;
`

const OneOption = styled.div `
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-left: 5px;
	margin-right: 4px;
	max-width: 200px;
`

const Button = styled.button`
	border-radius: 5px;
	width: 50%;
	margin-left: auto;
	margin-right: auto;
	outline: none;
	border: none;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.BLACK_LIGHT};
	box-shadow: 2px 2px 12px #555;
`


const Text = styled.div`
	color: white;
	font-size: 0.9em;
	margin-left: 7%;
	margin-bottom: 2px;
`

export default function OptionMenu(setQuery, type) {
	const [genre, setGenre] = React.useState('');
	const [date, setDate] = React.useState('');
	const [date2, setDate2] = React.useState('');
	const [vote, setVote] = React.useState('');
	const [order, setOrder] = React.useState('');


	const optionsGenre = [
		{value: 28, label: 'Action'},
		{value: 12, label: 'Adventure'},
		{value: 16, label: 'Animation'},
		{value: 35, label: 'Comedy'},
		{value: 80, label: 'Crime'},
		{value: 99, label: 'Documentary'},
		{value: 18, label: 'Drama'},
		{value: 10751, label: 'Family'},
		{value: 14, label: 'Fantasy'},
		{value: 36, label: 'History'},
		{value: 27, label: 'Horror'},
		{value: 10402, label: 'Music'},
		{value: 9648, label: 'Mystery'},
		{value: 10749, label: 'Romance'},
		{value: 878, label: 'Sciense Fiction'},
		{value: 10770, label: 'TV Movie'},
		{value: 53, label: 'Thriller'},
		{value: 10752, label: 'War'},
		{value: 37, label: 'Western'},
	]
	const optionsDate = [
		{value: 2020, label: '2020'},
		{value: 2010, label: '2010 - 2019'},
		{value: 2000, label: '2000 - 2009'},
		{value: 1990, label: '1990 - 1999'},
		{value: 1980, label: '1980 - 1989'},
		{value: 1970, label: '1970 - 1979'},
		{value: 1960, label: '1960 - 1969'},
		{value: 1950, label: '1950 - 1959'},
	]

	const optionsStars = [
		{value: 5,label: '5 stars'},
		{value: 4,label: '4 stars'},
		{value: 3,label: '3 stars'},
		{value: 2,label: '2 stars'},
		{value: 1,label: '1 star'},
		{value: 0,label: '0 star'},
	]

	const optionsOrder = [
		{value: 3, label: 'Popularity ↑'},
		{value: 4, label: 'Popularity ↓'},
		{value: 5, label: 'Date ↑'},
		{value: 6, label: 'Date ↓'},
		{value: 7, label: 'Stars ↑'},
		{value: 8, label: 'Stars ↓'},
	]

	// setValue //
	const genreChange = event => {
		setGenre(event.value);
	};

	const dateChange = event => {
		setDate(event.value);
		setDate2(parseInt(event.value) + 9);
	};

	const voteChange = event => {
		setVote(event.value);
	};

	const orderChange = event => {
		setOrder(event.value);
	};

	// Set query for the research //
	const submit = () => {
		var queryGenre = '';
		var queryDate = '';
		var queryVote = '';
		var queryOrder = '';
		if (vote !== '') {
			queryVote = '&vote_average.gte=' + (vote * 2) + '&vote_average.lte=' + (vote * 2 + 1) ;
		} if (genre !== '') {
			queryGenre = '&&with_genres=' + genre
		} if (date !== '') {
			queryDate = '&&primary_release_date.gte=' + date + '-01-01&primary_release_date.lte=' + date2 + '-12-31';
		} if (order !== '') {
			if (order === 3 || order === 4) {
				let trie = order === 3 ? 'desc' : 'asc';
				queryOrder = '&sort_by=popularity.' + trie;
			} else if (order === 5 || order === 6) {
				let trie = order === 5 ? 'desc' : 'asc';
				queryOrder = '&sort_by=release_date.' + trie;
			} else if (order === 7 || order === 8) {
				let trie = order === 7 ? 'desc' : 'asc';
				queryOrder = '&sort_by=vote_average.' + trie;
			}
		}
		setQuery('https://api.themoviedb.org/3/discover/' + type + '?api_key=c618784bdd2787da4972dd45f397869b&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
	}

	return (
		<OptionContainer>
			<OneOption>
				<Text>Genre :</Text>
				<Select  onChange={ genreChange } options={ optionsGenre } />
			</OneOption>
			<OneOption>
				<Text>Date :</Text>
				<Select onChange={ dateChange } options={ optionsDate } />
			</OneOption>
			<OneOption>
				<Text>Stars :</Text>
				<Select onChange={ voteChange } options={ optionsStars } />
			</OneOption>
			<OneOption>
				<Text>Order by:</Text>
				<Select onChange={ orderChange } options={ optionsOrder } />
			</OneOption>
			<Button onClick={ submit }>
					Search
			</Button>
		</OptionContainer>
	)	
}
