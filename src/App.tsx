import { useEffect, useMemo, useState } from 'react';
import type { Movie } from './types';
import axios from 'axios';
import { Header } from './components/Header/Header';
import { MovieCard } from './components/MovieCard/MovieCard';
import { Modal } from './components/Modal/Modal';
import './App.css';

function App() {
	const [query, setQuery] = useState<string>('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

	const filteredMovies = useMemo(() => {
		if (!query.trim()) return movies;

		return movies.filter(({ title }) =>
			title.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, movies]);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
				if (Array.isArray(res.data)) setMovies(res.data);
			} catch (error) {
				console.error(error);
			}
		})();
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
					<p className="noMoviesAlert">Тут пусто</p>
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
