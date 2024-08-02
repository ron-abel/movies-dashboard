"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function AddMovies({params}) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState();
  const [poster, setPoster] = useState();
  const readPoster = useRef();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    validateForm();
  }, [title, year, poster]);

  const validateForm = () => {
    let errors = {};

    if (!title) {
      errors.title = "Title is required."
    }

    if (!poster) {
      errors.password = "poster is required."
    }

    if (!year) {
      errors.year = "Year is required."
    }


    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  const cancel = () => {
    router.push('/movies');
  }

 
  const updateMovie = async () => {
    if (isFormValid) {
      const data = await fetch(`http://localhost:3000/api/movies/${params.movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:params.movieId, title, poster, year }),
      })
      if(data){
        router.push('/movies');
      }
     
    }
    else {
      alert("data is missing")
    }
  }

  const handlePoster = (e) => {
  
    setPoster(URL.createObjectURL(e.target.files[0]));
  }
  const readImg = (e) => {
    readPoster.current.click();
  }


  return (

    <>
      <div className="add-movies d-flex align-items-center container">
        <div className="w-100"><h2 className=" text-white">Edit</h2>
          <div className="row mt-5 justify-content-md-center">
            <div className="col-12 col-lg-4 col-md-6 order-2 order-md-1">
              <div id="drop-area" onClick={readImg}>
                <input type="file" ref={readPoster} id="file-input" onChange={handlePoster} />
                <img style={{ width: "20px" }} src="/images/download.svg" className="img-fluid  card-img-top" alt="..." />
                {!poster && <label className="text-white fw-light" >Drag an poster here</label>}
                <ul id="file-list"><li className="text-white">{poster}</li></ul>
              </div>

              {errors.poster && <div className="form-text error-message text-danger">{errors.poster}</div>}
            </div>
            <div className="col-12 col-lg-8 col-md-6 order-1 order-md-2">
              <div className="card border-0 bg-transparent movie-form rounded-0 ">
                <form className="bg-transparent ">
                  <div className="title">
                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" style={{ background: "#224958", color: "white" }} placeholder="Title" className="form-control  border-0 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.title && <div className="form-text error-message text-danger">{errors.title}</div>}
                  </div>
                  <div className="my-3 mb-5 year">
                    <input value={year} onChange={(e) => { setYear(e.target.value) }} style={{ background: "#224958", color: "white" }} type="text" placeholder="Publishing year" className="form-control border-0 form-control-sm" id="exampleInputPassword1" />
                    {errors.year && <div className="form-text error-message text-danger">{errors.year}</div>}
                  </div>
                  <div className="d-flex action-buttons justify-sm-content-between gap-3">
                    <button onClick={cancel} type="button" className="btn bg-transparent btn-outline-light">Cancel</button>
                    <button onClick={updateMovie} type="button" className="btn  border-0 text-white">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div></div>



      </div>
    </>
  );
}
