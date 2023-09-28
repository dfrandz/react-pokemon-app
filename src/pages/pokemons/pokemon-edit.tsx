import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon from "../../models/pokemon/pokemons";
import PokemonForm from "../../components/pokemons/pokemonForm";
import PokemonService from "../../services/pokemon-service";
import Leader from "../../components/leader";

const Pokemonedit = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const id = useParams();
    const productIdAsNumber = parseInt(id.id)

    useEffect(() => {
        PokemonService.getPokemon(productIdAsNumber).then(pokemon => setPokemon(pokemon))
    },[id])
  return (
    <>
        <div>
            {
                pokemon ? (
                    <div>
                        <PokemonForm pokemon={pokemon} isEditForm={true}/>
                    </div>
                ) : (
                <div> <Leader/> </div>
            )}

        </div>
    </>
  )
}

export default Pokemonedit