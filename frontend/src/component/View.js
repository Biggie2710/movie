import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [allValues, setAllValues] = useState([]);
    useEffect(() => {
        if (location.state == null) {
            navigate('/home')
        }
        if (location.state !== 'null') {
            findMovies(location.state);
        }
    }, []);

    const findMovies = async (imdbID) => {
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=48aa722f`;
        const res = await fetch(`${url}`);
        const data = await res.json();
        if (data) {
            setAllValues([data]);
        }
    }
    return (
        <div class="row mt-5 mb-3 expertCon">
            {
                allValues ? allValues.map((data) => {
                    return <div class="col-lg-4 expert"> <div class="card" >
                        <img src={data.Poster} class="card-img-top" style={{ height: "300px" }} alt="..." />
                        <div class="card-body">
                            <h4 class="card-title">Title: {data.Title}</h4>
                            <h5 class="card-title">Director: {data.Director}</h5>
                            <h6 class="card-title">Type: {data.Type}</h6>
                            <h6 class="card-title">Year: {data.Year}</h6>
                            <h6 class="card-title">Awards: {data.Awards}</h6>
                            <h6 class="card-title">BoxOffice: {data.BoxOffice}</h6>
                            <h6 class="card-title">Runtime: {data.Runtime}</h6>
                            <p class="card-text">{data.Plot}</p>
                        </div>
                    </div>
                    </div>
                })
                    : <div class="d-flex justify-content-center">
                        <div class="spinner-border text-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default View