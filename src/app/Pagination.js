import React from 'react';

const Paginate = ({ moviesPerPage, totalMovies, paginate, currentPage, previousPage, nextPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className=" d-flex mt-5 justify-content-center pagination">
                <li  className="page-number">
                    <button  className={"btn bg-transparent mx-2 text-white"} onClick={previousPage} type="button" >Prev</button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className="page-number"
                    >
                        <button className={currentPage != number ? "btn inactive-btn mx-2 text-white" : "btn mx-2 text-white"} onClick={() => paginate(number)} type="button" >{number}</button>
                    </li>
                ))}
                <li  className="page-number">
                    <button className={"btn bg-transparent mx-2 text-white"} onClick={nextPage} type="button" >Next</button>
                </li>
            </ul>
        </div>
    );

};

export default Paginate;