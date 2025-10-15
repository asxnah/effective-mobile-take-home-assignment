import type { MovieCardProps } from '../../types';
import './styles.css';

export const MovieCard = ({ movie, onMovieClick }: MovieCardProps) => {
	return (
		<li className="movie" onClick={onMovieClick}>
			<img
				src={movie.iconSrc}
				alt={`Постер к фильму ${movie.title}`}
				className="movie__preview"
				loading="lazy"
			/>
			<div className="movie__info">
				<h3 className="movie__title">{movie.title}</h3>
				<span className="movie__year">{movie.year}</span>
			</div>
		</li>
	);
};
