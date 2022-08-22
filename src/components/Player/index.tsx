import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { Movie } from '../../interface/movie';

import Card from '../Card';

//@ts-ignore
export default function Player(props) {
    const { data } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    //@ts-ignore
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };


    return (
        <>
            <div className='images'>
                {
                    currentItems.map((movie: Movie) => {
                        return (
                            <Card
                                key={`pagination+${movie.id}`}
                                id={movie.id}
                                title={movie.title}
                                movie_banner={movie.movie_banner}
                                director={movie.director}
                                producer={movie.producer}
                                description={movie.description}
                            />
                        )
                    })
                }
            </div>
            <div className="flex flex-col content-center items-center">
                <div className='flex flex-row gap-2' >
                    <div className="pagination " title='Itens por página'>
                        <select className='page-num-select' name="" id="" onChange={e => setItemsPerPage(Number(e.target.value))}>
                            <option value="2" selected>2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< "
                        //@ts-ignore
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName='page-num'
                        previousLinkClassName='page-num'
                        nextLinkClassName='page-num'
                        activeLinkClassName='active'
                    />
                </div>
            </div>
        </>
    );
}
