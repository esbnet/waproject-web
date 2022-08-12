import { useState, useEffect } from 'react'
import Player from './components/Pagination';

import {
    CloudDownloadIcon
} from '@heroicons/react/solid'

import './App.css'

const URL_API = "https://esbnetwaproject.herokuapp.com/v1/movies";

function App() {
    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        const result = await fetch(URL_API + "/")
            .then(response => response.json())
        setMovies(result);
        return
    }

    const fetchLoad = async () => {
        const result = await fetch(URL_API + '/load')
            .then(response => response.json())
        alert("Dados dos filmes da API externa fora carregadas na base da aplicação.")
        fetchData();
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
            {movies.length > 0 ? <Player data={movies} /> :
                (<div className="container mx-auto px-4 py-4 text-center shadow-lg font-roboto-bold text-2xl">
                    <h1>Não existe filmes na base de dados...</h1>
                </div>
                )
            }
        </div>
    )
}

export default App
