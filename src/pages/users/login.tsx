import { useState } from "react";
import AuthenticationService from "../../services/auth/authentication-service";
import { useNavigate } from "react-router-dom";



type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    username: Field,
    password: Field
}
const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState<Form>({
        username: { value: '' },
        password: { value: '' },
    });
    
    const [message, setMessage] = useState<string>('Vous êtes déconnecté. (pikachu / pikachu)');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };
    
        setForm({ ...form, ...newField});
    }

    const validateForm = () => {
        let newForm: Form = form;
        // Validator username
        if(form.username.value.length < 3) {
          const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.';
          const newField: Field = { value: form.username.value, error: errorMsg, isValid: false };
          newForm = { ...newForm, ...{ username: newField } };
        } else {
          const newField: Field = { value: form.username.value, error: '', isValid: true };
          newForm = { ...newForm, ...{ username: newField } };
        }
    
        // Validator password
        if(form.password.value.length < 6) {
          const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
          const newField: Field = {value: form.password.value, error: errorMsg, isValid: false};
          newForm = { ...newForm, ...{ password: newField } };
        } else {
          const newField: Field = { value: form.password.value, error: '', isValid: true };
          newForm = { ...newForm, ...{ password: newField } };
        }
    
        setForm(newForm);
    
        return newForm.username.isValid && newForm.password.isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if(isFormValid) {
          setMessage('👉 Tentative de connexion en cours ...');
          AuthenticationService.login(form.username.value, form.password.value).then(isAuthenticated => {
            if(!isAuthenticated) {
              setMessage('🔐 Identifiant ou mot de passe incorrect.');
              return;
            }
            navigate(`/pokemons`);
        });
    }
    }
    return (

        
            <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
                <main className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                {message && <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{message}</h1>}
                            </div>

                            <div className="mt-5">

                                <form onSubmit={e=>handleSubmit(e)}>
                                    <div className="grid gap-y-4">

                                        <div>
                                            <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                            <div className="relative">
                                                <input type="text" id="username" name="username" onChange={(e)=>handleInputChange(e)} className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                
                                            </div>
                                            {form.username.error && 
                                                <div className="text-xs text-red-600 mt-2">
                                                    {form.username.error}
                                                </div>
                                            }
                                            
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                            </div>
                                            <div className="relative">
                                                <input type="password" id="password" name="password" onChange={(e)=>handleInputChange(e)} className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" />
                                                
                                            </div>
                                            {form.password.error && 
                                                <div className="text-xs text-red-600 mt-2">
                                                    {form.password.error}
                                                </div>
                                            }
                                        </div>
                                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign in</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        

    )
}

export default Login