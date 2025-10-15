import type { HeaderProps } from '../../types';
import './styles.css';

export const Header = ({ query, onChange, onReset }: HeaderProps) => {
	return (
		<header className="header">
			<h1 className="header__title" onClick={onReset}>
				Каталог фильмов
			</h1>
			<input
				name="search"
				type="search"
				placeholder="Поиск..."
				minLength={1}
				maxLength={255}
				required
				className="header__search"
				value={query}
				onChange={onChange}
			/>
		</header>
	);
};
