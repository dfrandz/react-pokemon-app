import React, { FunctionComponent, useState } from "react"
import Pokemon from "../../models/pokemon/pokemons"
import formatType from "../../helpers/format-type"
import { useNavigate } from "react-router-dom"
import PokemonService from "../../services/pokemon-service"

type Props = {
    pokemon: Pokemon,
    isEditForm: boolean,
}

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    picture:Field,
    name:Field,
    hp:Field,
    cp:Field
    types:Field
}

const pokemonForm: FunctionComponent<Props> = ({ pokemon , isEditForm}) => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Form>({
        picture: {value: pokemon.picture},
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
    })

    const types:string[]= [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Combat',  'Poison',   'Vol',    'Fée',     'Psy'
    ]

    const hasType = (type:string): boolean =>{
        return form.types.value.includes(type)
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldName]: {value: fieldValue}};

        setForm({...form, ...newField});
    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>):void =>{
        const checked = e.target.checked;
        let newField: Field;

        if(checked){
            const newTypes: string[] = form.types.value.concat([type]);
            newField = {value : newTypes};
        }else{
            const newTypes: string[] = form.types.value.filter( (currentType: string) => currentType !== type);
            newField = {value : newTypes};
        }

        setForm({...form, ...{types: newField}});
    }

    const isAddForm=() =>{
        return !isEditForm
    }

    const validationForm = () =>{
        let newForm: Form = form;

        //validation image

        if(isAddForm()){
            const start ="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
            const end = ".png";

            if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
                const errorMsg :string = 'L url n est pas valide.';
                const newField: Field = { value: form.picture.value, error: errorMsg, isValid:false}
                newForm = {...newForm, ...{picture:newField}}
            }else{
                const newField: Field = {value: form.picture.value, error: '', isValid:true};
                newForm = {...newForm, ...{picture:newField}}
            }
        }

        //Validation name
        if(!/^[a-zA-Zàéè]{3,25}$/.test(form.name.value)){
            const errorMsg: string = 'Le nom du pokémon est requis {1-25}.';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid:false}
            newForm = {...newForm, ...{name:newField}}
        }else{
            const newField: Field = {value: form.name.value, error: '', isValid:true};
            newForm = {...newForm, ...{name:newField}}
        }

        //Validation hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value)){
            const errorMsg: string = 'Point de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid:false}
            newForm = {...newForm, ...{hp:newField}}
        }else{
            const newField: Field = {value: form.hp.value, error: '', isValid:true};
            newForm = {...newForm, ...{hp:newField}}
        }

         //Validation cp
         if(!/^[0-9]{1,2}$/.test(form.cp.value)){
            const errorMsg: string = 'Les degats du pokémon sont compris entre 0 et 99.';
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid:false}
            newForm = {...newForm, ...{cp:newField}}
        }else{
            const newField: Field = {value: form.cp.value, error: '', isValid:true};
            newForm = {...newForm, ...{cp:newField}}
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid
    }

    const isTypesValid = (type:string):boolean =>{
        if(form.types.value.length === 1 && hasType(type)){
            return false;
        }
        if(form.types.value.length>=3 && !hasType(type)){
            return false
        }
        return true
    }

    const handleSubmit = (e) =>{    
        e.preventDefault();
        const isFormValid = validationForm();
        if(isFormValid){
            pokemon.picture= form.picture.value;
            pokemon.cp=form.cp.value;
            pokemon.hp=form.hp.value;
            pokemon.name=form.name.value;
            pokemon.types=form.types.value;
            isEditForm ? updatePokemon() : addPokemon()
        }
    }

    const addPokemon = () =>{
        PokemonService.addPokemon(pokemon).then( () => navigate(`/pokemons`))
    }
    const updatePokemon = () =>{
        PokemonService.updatePokemon(pokemon).then( () => navigate(`/pokemons/${pokemon.id}`))
    }

    return (
        <>
           
            <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                <form onSubmit={e=>handleSubmit(e)} className="lg:col-span-3">
                    
                    <div className='flex justify-between items-center'>
                        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
                            {pokemon?.name}
                        </h1>
                        {isEditForm && (
                            <button type="submit" className='bg-yellow-400 p-2 text-black rounded-sm hover:scale-105 transition-all ease-in-out duration-300'>Valider</button>
                        )}
                        {!isEditForm && (
                            <button type="submit" className='bg-yellow-400 p-2 text-black rounded-sm hover:scale-105 transition-all ease-in-out duration-300'>Ajouter</button>
                        )}
                    </div>
                    <div  className="mt-2 lg:mt-6">
                        <div className='flex flex-col gap-4'>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id='name' value={form.name.value} onChange={e => handleInputChange(e)} className="py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                {form.name.error && 
                                    <div className="text-red-500 font-serif">
                                        {form.name.error}
                                    </div>
                                }
                            </div>
                            <div>
                                <label htmlFor="hp">Point de vie</label>
                                <input type="number" name='hp' id='hp' value={form.hp.value} onChange={e => handleInputChange(e)} className="py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                {form.hp.error && 
                                    <div className="text-red-500 font-serif">
                                        {form.hp.error}
                                    </div>
                                }
                            </div>
                            <div>
                                <label htmlFor="cp">Dégats</label>
                                <input type="number" name='cp' id='cp' value={form.cp.value} onChange={e => handleInputChange(e)} className="py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                {form.cp.error && 
                                    <div className="text-red-500 font-serif">
                                        {form.cp.error}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex mt-2 flex-col'>
                            <div className='flex flex-col md:flex-row md:items-center items-start gap-4'>
                                <label htmlFor="">Type</label>
                                {types.map( type => (
                                    <div key={type} className="flex justify-center items-center gap-4">
                                            <input type="checkbox" id={type}  value={type} checked={hasType(type)} disabled={!isTypesValid(type)} onChange={e => selectType(type, e) } />
                                        <label>
                                            <span>
                                                <p className={formatType(type)}>{type}</p>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </form>
                {isEditForm && (
                    <div className="lg:col-span-4 mt-10 lg:mt-0 border flex justify-center">
                        <img className="w-[20vw] rounded-xl object-cover" src={pokemon?.picture} alt="Image Description" />
                    </div>
                )}
                {isAddForm && (
                    <div className="lg:col-span-4 mt-10 lg:mt-0 border flex justify-center">
                        <input type="text" name='picture' id='picture' value={form.picture.value} onChange={e => handleInputChange(e)} className="py-2 px-3 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                        {form.picture.error && 
                            <div className="text-red-500 font-serif">
                                {form.picture.error}
                            </div>
                        }
                    </div> 
                )}
            </div>
        </>
    )
}

export default pokemonForm