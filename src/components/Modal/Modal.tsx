import type { ModalProps } from '../../types';
import { truncate } from '../../utils/truncate';
import { StarIcon } from '../../assets/StarIcon';
import { XMarkIcon } from '../../assets/XMarkIcon';
import './styles.css';

export const Modal = ({ currentMovie, onClose }: ModalProps) => {
	return (
		<div className="modalMovieWrapper">
			<div className="modalMovie">
				<div className="modalMovie__main">
					<div className="modalMovie__info">
						<img
							src={currentMovie.iconSrc}
							alt={`Постер к фильму ${currentMovie.title}`}
							className="modalMovie__preview"
						/>
						<div className="modalMovie__text">
							<h2 className="modalMovie__title">{currentMovie.title}</h2>
							<span className="modalMovie__year">{currentMovie.year}</span>
							<ul className="modalMovie__genres">
								{currentMovie.genres.map((genre) => (
									<li key={genre} className="modalMovie__genre">
										{genre}
									</li>
								))}
							</ul>
							<p className="modalMovie__desc">
								{truncate(currentMovie.desc)}...
							</p>
						</div>
					</div>
					<button className="modalMovie__closeButton" onClick={onClose}>
						<XMarkIcon />
					</button>
				</div>
				<div className="modalMovie__rating">
					<StarIcon />
					<span className="modalMovie__rating-number">
						{currentMovie.rating}
					</span>
				</div>
			</div>
		</div>
	);
};
