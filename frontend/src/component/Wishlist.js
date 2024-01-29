import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const Wishlist = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [wishData, setWishData] = useState([]);
    useEffect(() => {
        if (location.state == null) {
            navigate('/home')
        }
        if (location.state !== 'null') {
            setWishData(location.state);
        }
    }, []);
    return (
        <div class="row mt-5 mb-3 expertCon">
            <h4 class="card-title text-center mb-3">Wishlist Data</h4>
            {
                wishData && wishData.map((data) => {
                    return <div class="col-lg-3 expert">
                        <div class="card" >
                            <img src={data.Poster} class="card-img-top" style={{ height: "300px" }} alt="..." />
                            <div class="card-body">
                                <h4 class="card-title">{data.Title}</h4>
                                <h5 class="card-title">{data.Director}</h5>
                                <h6 class="card-title">{data.Type}</h6>
                                <h6 class="card-title">{data.Year}</h6>
                                <p class="card-text">{data.Plot}</p>
                                <div class="row">
                                    <div class="col">
                                        <a class="btn btn-outline-info btn-sm" onClick={() => navigate('/view', { state: data.imdbID })}>View</a>
                                    </div>
                                    {
                                        data?.status == 'true' ? <div class="col">
                                            <a class="btn btn-outline-danger btn-sm">Remove from Watchlist</a>
                                        </div> :
                                            <div class="col">
                                                <a class="btn btn-outline-success btn-sm" >Add to Watchlist</a>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Wishlist