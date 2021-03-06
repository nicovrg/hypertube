import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import api from '../../api/api'

export default function ButtonFavorite(props) {
	const [color, setColor] = useState(props.favorites.includes(props.elem.id.toString()) === true ? 'red' : 'grey');

	const handleClick = id => {
		// console.log(id)
		api.post('/movie/favorites', {movie: id})
		.then((res) => {
			// console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
		setColor(color === 'red' ? 'grey' : 'red');
	}


	return (
		<div onClick={ e => handleClick(props.elem.id) }>
			<FavoriteIcon className={color === 'red' ? "favorite" : ""} />
		</div>
	)
}