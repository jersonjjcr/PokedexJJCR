import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useName } from '../../hooks/useName';
import '../home/home.css';
import pikachu from '/img/pikachu.webp';
import pokemon from '/img/pokemon.svg';

function Home() {
	const inputRef = useRef();
	const { setName, name } = useName();
	const navigate = useNavigate();

	const handleSetName = (e) => {
		if (!inputRef.current.value) return;
		setName(inputRef.current.value);
		navigate('/pokedex');
	};

	return (
		<div className="container">
			<div
				className="pikachu-spin"
				style={{
					backgroundImage: `url(/img/pikachu.webp)`,
					position: 'absolute',
					width: 'clamp(300px, 8%, 600px)',
					height: 'clamp(300px, 8%, 600px)',
					zIndex: '2',
					top: '40%',
					left: '30%',
					transform: 'translate(-%, -50%)',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
				title="Pikachu giratorio"
			/>
			<div
				className="charizard-spin"
				style={{
					backgroundImage: 'url(/img/charizard.webp)',
					position: 'absolute',
					width: 'clamp(300px, 12%, 600px)',
					height: 'clamp(300px, 12%, 600px)',
					zIndex: '2',
					top: '13%',
					right: '0.5%',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
				title="Charizard"
			/>

			<img className="pokelogo" src={pokemon} alt="Logo Pokémon" />
			<h1 className="title-pokedex">TRAINER</h1>
			<div className="container-pokedex">
				<input
					className="input-pokedex"
					type="text"
					ref={inputRef}
					onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
					placeholder="Ingresa tu nombre"
				/>
				<button className="button-pokedex" onClick={handleSetName}>
					Empezar ahora
				</button>
				<p className="text-pokedex">Ingresa tu nombre</p>
			</div>
		</div>
	);
}

export default Home;
