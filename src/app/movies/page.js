"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Paginate from "../Pagination";

export default function MyMovies() {
  const router = useRouter();
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data)

      })
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  if(allMovies != null || allMovies.length > 0){
    var currentMovies = allMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  }
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
   
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
 
    if (currentPage !== Math.ceil(allMovies.length / moviesPerPage)) {
       setCurrentPage(currentPage + 1);
    }
 };

  const addMovie = () => {
    router.push("/addMovie")
  }
  const logout = () => {
    router.push("/")
  }

  const editMovie = (id) => {
    router.push(`/movies/${id}`);
  }

 
  return (

    <>
      {(allMovies == null || allMovies.length == 0) ? (
        <div className="container d-flex justify-content-center empty-movies">
          <div className="card bg-transparent border-0 p-5 d-flex justify-content-center align-items-center rounded-0 empty-state">
            <h2 className="mb-3 text-white">Your movie list is empty</h2>
            <button onClick={addMovie} type="button" className="btn border-0 new-btn text-white">Add a new movie</button>
          </div>
        </div>
      ) : (
        <div className="container all-movies">
          <div className="row mb-5 justify-content-md-center">
            <div className="col-6 ">
              <h2 onClick={addMovie} className="text-white">My movies&nbsp;<img style={{ width: "20px" }} src="./images/add.svg" className="img-fluid  card-img-top" alt="..." /></h2>
            </div>
            <div className="col-6 d-flex justify-content-end ">
              <button onClick={logout} type="button" className="btn d-flex align-items-center border-0 text-white bg-transparent">Logout &nbsp;<img style={{ width: "20px" }} src="./images/logout.svg" className="img-fluid  card-img-top" alt="..." />
              </button>
            </div>
          </div>

          <div className="row justify-content-md-center">
            {currentMovies.map((element, i) => {
             
              return (
                <div className="col-5 pb-3 m-lg-0 m-3 col-lg-3 col-md-4 " key={i}>
                  <div onClick={() => editMovie(element.id)} className="p-2 movie-cards card border-0 rounded-4" style={{cursor:"pointer" ,background: "#092C39", height: "auto" }}>
                    <img src={"/images/img1.svg"} className="img-fluid  card-img-top" alt="..." />
                    <div className=" p-1">
                      <p className="m-0 py-2 movie-name text-white card-text">{element.title}</p>
                      <p className="m-0 pb-2 year fw-light text-white card-text">{element.year}</p>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
          
          <Paginate
            moviesPerPage={moviesPerPage}
            totalMovies={allMovies.length}
            currentPage = {currentPage}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />

        </div>
      )
      }
    </>
  );
}
