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
        const result = await fetch(URL_API + "/").then(response => response.json())
        setMovies(result);
        setIsLoad(false);
        return
    }

    const fetchLoad = async () => {
        const result = await fetch(URL_API + "/count").then((response) => response.json());

        if (Number(result.count) < 100) {
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
                    <CloudDownloadIcon className='w=10 h-10 p-2  bg-blue rounded-full hover:bg-purple' />
                </button>
                {movies.length <= 0 ?
                    (<span className="flex h-3 w-3 float-right rounded-full bg-yellow mb-2 mr-[-10px] border-1" >
                        <span className="animate-ping relative inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                    </span>)
                    : ''
                }
            </div>
            {
                isLoad ? (
                    <div className="flex flex-col container mx-auto px-4 py-4 mt-6 text-center text-2xl items-center">
                        <div className="h-8 w-8 border-4 border-l-gray-light border-r-gray-light border-b-gray-light border-t-blue animate-spin ease-linear rounded-full" />
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
        </div >
    )
}

export default App
