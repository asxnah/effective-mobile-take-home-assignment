import { useEffect, useMemo, useState } from 'react';
import type { Movie } from './types';
import { Header } from './components/Header/Header';
import { MovieCard } from './components/MovieCard/MovieCard';
import { Modal } from './components/Modal/Modal';
import { getData } from '../server/api';
import './App.css';

function App() {
	const [query, setQuery] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

	const filteredMovies = useMemo(() => {
		if (!query.trim()) return movies;

		return movies.filter(({ title }) =>
			title.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, movies]);

	useEffect(() => {
		const fetchMovies = async () => {
			const res = await getData();
			if (res.success) {
				setMovies(res.data);
				setError(null);
			}
			if (!res.success) {
				setError(res.data);
			}
		};

		fetchMovies();
	}, []);

	return (
		<>
			<Header
				query={query}
				onChange={(e) => setQuery(e.target.value)}
				onReset={() => setQuery('')}
			/>
			<main>
				{filteredMovies && filteredMovies.length > 0 ? (
					<ul className="movies">
						{filteredMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								onMovieClick={() => setCurrentMovie(movie)}
							/>
						))}
					</ul>
				) : (
					<p className="noMoviesAlert">{error || 'Ничего не найдено'}</p>
				)}
			</main>
			{currentMovie && (
				<Modal
					currentMovie={currentMovie}
					onClose={() => setCurrentMovie(null)}
				/>
			)}
		</>
	);
}

export default App;
