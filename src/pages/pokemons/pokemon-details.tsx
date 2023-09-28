import { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../../models/pokemon/pokemons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import formatDate from '../../helpers/format-date';
import formatType from '../../helpers/format-type';
import PokemonService from '../../services/pokemon-service';
import Leader from '../../components/leader';

const PokemonDetail: FunctionComponent = () => {
    const navigate = useNavigate();
    const [currentPokemon, setPokemon] = useState<Pokemon | null>(null);
    const id = useParams();
    const productIdAsNumber = parseInt(id.id)

    useEffect(() => {
        PokemonService.getPokemon(productIdAsNumber).then(pokemon => setPokemon(pokemon))
    },[id])

    const handleDelete =(pokemon: Pokemon)=>{
        PokemonService.deletePokemon(pokemon).then(() => navigate(`/pokemons`))
    }

    return (
        <div>
            {currentPokemon ? (
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                        <div className="lg:col-span-3">
                        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
                            {currentPokemon?.name}
                        </h1>
                        <div className="mt-2 lg:mt-6">
                            <div className='flex justify-between items-center'>
                                <span className="text-xs font-medium text-gray-800 uppercase dark:text-gray-200">
                                    {formatDate(currentPokemon?.created)}
                                </span>
                                <div className='flex gap-4'>
                                    <button type='button' onClick={() => handleDelete(currentPokemon)} className='bg-red-500 p-2 text-black rounded-sm hover:scale-105 transition-all ease-in-out duration-300'>delete</button>
                                    <Link to={`/pokemon/edit/${currentPokemon?.id}`} className='bg-yellow-400 p-2 text-black rounded-sm hover:scale-105 transition-all ease-in-out duration-300'>edit</Link>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 mt-5'>
                                <div>
                                    <label htmlFor="name">Nom</label>
                                    <p className='py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>{currentPokemon?.name}</p>
                                    
                                </div>
                                <div>
                                    <label htmlFor="hp">Point de vie</label>
                                    <p className='py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>{currentPokemon?.hp}</p>

                                    
                                </div>
                                <div>
                                    <label htmlFor="cp">Dégats</label>
                                    <p className='py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>{currentPokemon?.cp}</p>
                                </div>
                            </div>
                            <div className='flex gap-1 mt-2'>
                            <label>Type</label>
                                {currentPokemon?.types.map( type => (
                                    <div key={type} className='flex flex-col items-center gap-4'>
                                        <span>
                                            <p className={formatType(type)}>{type}</p>
                                        </span>
                                    </div>
                                ) )}
                            </div>
                        </div>
                        
                        </div>
                        <div className="lg:col-span-4 mt-10 lg:mt-0 border flex justify-center">
                            <img className="w-[20vw] rounded-xl object-cover" src={currentPokemon?.picture} alt="Image Description"/>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Leader/>
                </div>
            )}
            
        </div>
    )
}

export default PokemonDetail