import { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
    // const [pokemonList] = useState<Pokemons[]>([]);

    return (
        <>
            <nav className="sticky -top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]" aria-label="Jump links">
                <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto dark:scrollbar-x">
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last-pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Dashboard</a>
                    </div>
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Users</a>
                    </div>
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Account</a>
                    </div>
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Projects</a>
                    </div>
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Calendar</a>
                    </div>
                    <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                        <a className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">
                            Documentation
                            <span className="inline bg-gray-100 text-xs text-gray-500 font-semibold rounded-full py-1 px-2 dark:bg-gray-700 dark:text-gray-400">v12.7</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar