import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";
import Button from "./components/Button.jsx";
import './index.css';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [loading, setLoading]=useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
                setPokemonList(result.data.results);
                setLoading(false);
                setError(null);
                console.log(result);
            } catch (e) {
                setLoading(false);
                setError('Fout bij het ophalen van Pokemon');
                console.error(e);
            }
        }


        fetchPokemon();
    }, [offset]);

// useEffect(() => {
//     async function fetchPokemonList() {
//         try {
//             const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}');
//
//             const data = await response.json();
//             setPokemonList(data.results);
//         } catch (error) {
//             console.error('Fout bij het ophalen van Pokemon', error);
//         }
//         ;
//     }
//
//     fetchPokemonList();
// },[offset]);
//

    const handlePrevClick = () => {
        if (offset >= limit) {
            setOffset((prevOffset) => prevOffset - limit);
        }
    }
    const handleNextClick = () => {
        setOffset((prevOffset) => prevOffset + limit);
        };

    return (
        <>


            <Button
                label='Vorige'
                onClick={handlePrevClick}
                disabled={offset === 0}
            />

            <Button label='Volgende'
                    onClick={handleNextClick}
            />
            <div className="outer-container">
            {/*<h1>Pokemon List</h1>*/}
            {/*<ul>*/}
            {/*    {pokemonList.map((pokemon, index) => (*/}
            {/*            <li key={index}>{pokemon.name}</li>*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</ul>*/}
            {pokemonList.length > 0 && (
                <>
                    {pokemonList.map((pokemon, index) => (
                        <PokemonCard
                            key={index}
                            name={pokemon.name}
                        />
                    ))}
                    )
                </>


            )}
            </div>
        </>
    );
}
export default App;
