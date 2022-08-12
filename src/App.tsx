import { useState, useEffect } from 'react'
import Player from './components/Pagination';

import {
    CloudDownloadIcon,
} from '@heroicons/react/solid'

import './App.css'

const URL_API = "https://esbnetwaproject.herokuapp.com/v1/movies";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoad, setIsLoad] = useState(true);

    const fetchData = async () => {
        const result = await fetch(URL_API + "/")
            .then(response => response.json())
        setMovies(result);
        setIsLoad(false);
        return
    }

    const fetchLoad = async () => {
        const count = await fetch(URL_API + "/count")

        if (Number(count) < 100) {
            await fetch(URL_API + '/load')
                .then(response => response.json())
            alert("Dados dos filmes da API externa fora carregadas na base da aplicação.")
            fetchData();
        }
        return
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className=''>
            <div className="mx-auto px-4 py-4 text-center text-[#fff] bg-gradient-to-r from-indigo-800  to-indigo-500  bg-[#2965C8] shadow-lg font-roboto-bold text-4xl text">
                WA Filmes
                <button onClick={fetchLoad} className="float-right " title='Carrega dados da API externa' >
                    <CloudDownloadIcon className='w=10 h-10 p-2 shadow-lg bg-blue rounded-full hover:bg-purple' />
                </button>
            </div>
            {
                isLoad ? (
                    <div className="flex flex-col container mx-auto px-4 py-4 text-center text-2xl items-center cont">
                        <div className="h-8 w-8 border-4 border-l-gray-light border-r-gray-light border-b-gray-light border-t-blue animate-spin ease-linear rounded-full">
                        </div>
                        Loading...
                    </div>
                ) :
                    (movies.length > 0 ? <Player data={movies} /> :
                        (<div className="container mx-auto px-4 py-4 mt-6 text-center shadow-lg font-roboto-bold text-2xl">
                            <h1>Não existem filmes na base de dados...</h1>
                        </div>
                        )
                    )
            }
        </div>
    )
}

export default App
