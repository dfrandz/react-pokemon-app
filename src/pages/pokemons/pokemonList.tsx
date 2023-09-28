import {FunctionComponent, useState, useEffect} from 'react'
import Pokemon from '../../models/pokemon/pokemons';
import PokemonCard from '../../components/pokemons/pokemonCard';
import PokemonService from '../../services/pokemon-service';
import PokemonSearch from '../../components/pokemons/pokemonSearch';
import Leader from '../../components/leader';

const PokemonList: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect( () =>{
      PokemonService.getPokemons().then(pokemons => setPokemons(pokemons))
    },[]);
  return (
    <div>
       <header className="justify-center items-center">
          <PokemonSearch/>
        </header>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {pokemons!=null ? (
          <div className="grid lg:grid-cols-3 lg:gap-y-16 gap-10">
            {pokemons.map( ( pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon}/>
            ))}
          </div>
        ) : (
          <div>
            <Leader/>
          </div>
        )}
        

      </div>
    </div>
  )
}

export default PokemonList