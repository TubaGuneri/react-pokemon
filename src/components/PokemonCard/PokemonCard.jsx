import './PokemonCard.css'
import {useEffect, useState} from "react";
import axios from "axios";
import './../../index.css'
function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchPokemonCard() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);

                setPokemon(result.data);
                console.log(result)
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemonCard();
    }, []);
    return (
        <>

            {Object.keys(pokemon).length > 0 && (



                        <div className='inner-container'>
                        <h1>{pokemon.name} </h1>
                        <img src={pokemon.sprites.front_default} alt="pokemon foto"/>
                        <h2>Moves: {pokemon.moves.length}</h2>
                        <h2> Weight: {pokemon.weight}</h2>
                        <h2>Abilities: </h2>
                        <ul className='container-abilities'>
                            {pokemon.abilities.map((ability, index) => (
                                <li key={index}>
                                    <p>{ability.ability.name}</p>
                                </li>
                            ))}
                        </ul>

                    </div>

            )
            }

        < />
    );
}

export default PokemonCard;