import { useState } from "react"
import Pokemon from "../../models/pokemon/pokemons";
import PokemonService from "../../services/pokemon-service";
import { Link } from "react-router-dom";


const PokemonSearch = () => {
    const [term, setTerm]= useState<string>();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const handleInputChange = (e): void =>{
        const term1 = e.target.value;
        setTerm(term1);
        if(term.length <= 1){
            setPokemons([]);
            return;
        }
        PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons));
    }

    
    return (
        <>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 justify-center flex align-middle">
                        <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                            <div className="py-3 px-4">
                                <div className="relative max-w-xs">
                                    <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                    <input type="text" name="term" onChange={(e)=>handleInputChange(e)} id="hs-table-search" className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Rechercher un Pokemon" />
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                        <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden z-40 flex flex-col">
                                {pokemons.map( (pokemon) =>(
                                    <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{pokemon.name}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonSearch