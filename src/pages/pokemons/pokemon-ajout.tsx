import { useState } from "react";
import PokemonForm from "../../components/pokemons/pokemonForm";
import Pokemon from "../../models/pokemon/pokemons";

const PokemonAdd = () => {
    const [id] = useState<number>(new Date().getTime())
    const [pokemon] = useState<Pokemon>(new Pokemon(id))
  return (
    <div>
        <PokemonForm pokemon={pokemon} isEditForm={false} />
    </div>
  )
}

export default PokemonAdd