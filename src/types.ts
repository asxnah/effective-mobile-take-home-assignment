import type { ChangeEvent } from 'react';

export interface Movie {
	id: string;
	iconSrc: string;
	title: string;
	year: string;
	rating: string;
	desc: string;
	genres: string[];
}

export interface HeaderProps {
	query: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onReset: () => void;
}

export interface ModalProps {
	currentMovie: Movie;
	onClose: () => void;
}

export interface MovieCardProps {
	movie: Movie;
	onMovieClick: () => void;
}
