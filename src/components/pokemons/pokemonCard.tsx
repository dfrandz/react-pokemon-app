import { FunctionComponent, useState } from 'react'
import Pokemon from '../../models/pokemon/pokemons'
import formatType from '../../helpers/format-type';
import formatDate from '../../helpers/format-date';
import { useNavigate } from 'react-router-dom';



type Props = {
    pokemon: Pokemon,
    borderColor?:string
}

const PokemonCard:FunctionComponent<Props> = ({pokemon, borderColor= '#009688'}) => {
    const [color, setColor]=useState<string>();
    const navigate = useNavigate();
    const showBorder = () =>{
        setColor(borderColor)
    }

    const hideBorder = ()=>{
        setColor('#f5f5f5')
    }

    const goToPokemon = (id:number)=>{
      navigate(`/pokemons/${id}`)
    }

  return (
    <div>
      <a className="group overflow-hidden" >
        <div className="sm:flex border-2 shadow-sm" onClick={() => goToPokemon(pokemon.id)} style={{ borderColor: color }} key={pokemon.id} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
          <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44 mt-4 mb-4">
            <img className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 left-0 object-cover rounded-xl" src={pokemon.picture} alt="Image Description"/>
          </div>

          <div className="grow mt-4 sm:mt-0 sm:ml-6 px-4 sm:px-0 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white mt-4">
            {pokemon.name}
            </h3>
            {pokemon.types.map( type =>(
              <p className={formatType(type)} key={type}>
                {type}
              </p>
            ))}
            <p className="mt-4 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
              {formatDate(pokemon.created)}
            </p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default PokemonCard