import { Movie } from "../../interface/movie"


import {
    FilmIcon, SpeakerphoneIcon, AdjustmentsIcon, DocumentIcon
} from '@heroicons/react/solid'


import './style.css'

export default function Card(props: Movie) {
    return (
        <div className='image p-2' >
            <img className='object-cover' src={props.movie_banner} alt={props.title} />
            <div className="flex flex-col text-orange">
                <div className="flex flex-row content-center items-center text-sm truncate" >
                    <FilmIcon className="h-4 w-4 mr-1"/>
                    {props.title}
                </div>
                <div className="flex content-center items-center text-sm truncate" >
                    <SpeakerphoneIcon className="h-3 w-3 mr-1" />
                    {props.director}
                </div>
                <div className="flex flex-row content-center text-sm " >
                    <AdjustmentsIcon className="h-3 w-3 mr-1" />
                    {props.producer}
                </div>
                <div className="h-self flex flex-row text-xs  text-gray-dark  p-2 text-justify" >
                    {props.description}
                </div>
            </div>
        </div>
    )

}