import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
    const key = '48aa722f';
    var totalLength;
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchInputMovie, setSearchInputMovie] = useState('');
    const [searchInputYear, setSearchInputYear] = useState('');
    const [searchInputGenre, setSearchInputGenre] = useState('');
    const [page, setPage] = useState([]);
    // const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetch('http://www.omdbapi.com/?i=tt3896198&apikey=48aa722f')
            .then(res => res.json())
            .then(data => {
                setData([data]);
                fetchData(data);
            });
    }, []);

    const fetchData = async (e) => {
        const result = await axios.get('http://localhost:5000/getwatchlist');
        wishlistFunc(result.data, e);
    };

    const wishlistFunc = (wishlist, e) => {
        let data = [];
        data?.push(e);
        let mockData = data && data?.map((element, index) => {
            var isEquel = JSON.stringify(element?.Title) === JSON.stringify(wishlist[0]?.title);
            if (isEquel == true) {
                return { ...element, status: 'true' };
            } else {
                return { ...element, status: 'false' };
            }
        })
        if (mockData) {
            setData(mockData);
        }
    }

    useEffect(() => {
        return () => {
            findMovies();
        };
    }, [searchInput]);

    const handleChange = (text) => {
        setSearchInput(text);
    }

    const handleClick = (e) => {
        setSearchInputYear(e);
    }

    const searchMovieList = (movie) => {
        setSearchInputMovie(movie);
    }

    const findMovies = async () => {
        const url = `https://www.omdbapi.com/?s=${searchInput?.trim()}&page=1&apikey=${key}`;
        const res = await fetch(`${url}`);
        const data = await res.json();
        if (data.Search) {
            searchMovieList(data.Search)
        }
    }

    const handleClickSearch = () => {
        if (searchInputYear !== '') {
            let tempData = searchInputMovie?.filter((dat) => {
                return dat?.Year == searchInputYear;
            });
            if (tempData) {
                setData(tempData);
            }
        } else {
            totalLength = Math.ceil(searchInputMovie.length / 3);
            let tmpPage = Array.from({ length: totalLength }, (_, i) => i + 1)
            setPage(tmpPage);
            if (totalLength && totalLength > 3) {
                let slicedArray = searchInputMovie.slice(0, 3);
                setData(slicedArray);
            } else {
                setData(searchInputMovie);
            }
        }
    }

    const handleClickPage = (page, i) => {
        if (page == 1) {
            let slicedArray = searchInputMovie.slice(0, page * 3);
            setData(slicedArray);
        }
        else if (page == 2) {
            let slicedArray = searchInputMovie.slice(page + 1, page * 3);
            setData(slicedArray);
        } else if (page == 3) {
            let slicedArray = searchInputMovie.slice(6, 9);
            setData(slicedArray);
        } else if (page == 4) {
            let slicedArray = searchInputMovie.slice(9, 12);
            setData(slicedArray);
        }
    }

    const handleClickWishlist = async (data) => {
        let title = data.Title;
        let year = data.Year;
        let director = data.Director;
        let imdbID = data.imdbID;

        let result = await fetch(
            'http://localhost:5000/wishlist', {
            method: "post",
            body: JSON.stringify({ title, year, director, imdbID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result) {
            fetchData(data);
        }
    };

    const handleClickWishlistPage = () => {
        let checkWishlist = data?.find((data) => data?.status == 'true');
        if (checkWishlist) navigate('/wishlist', { state: data })
        else {
            alert('No wishlist added')
        }
    }

    return (
        <div>
            <div class="card-container bg-light">
                <div class="container-fluid px-3 py-3">
                    <div class="row center mx-4 my-4 text-dark">
                        <div class="main-search-input-wrap">
                            <div class="main-search-input fl-wrap">
                                <div class="main-search-input-item">
                                    <input type="text"
                                        value={searchInput}
                                        onChange={(e) => handleChange(e.target.value)}
                                        placeholder="Search Movie..." />
                                </div>
                            </div>
                        </div>

                        <div class="container text-center">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="dropdown">
                                        <button class="btn btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Year {searchInputYear ? searchInputYear : '(optional)'}
                                        </button>
                                        <ul class="dropdown-menu">
                                            {
                                                searchInputMovie ? searchInputMovie?.map((year) => {
                                                    return <li><a class="dropdown-item" onClick={() => handleClick(year.Year)}>{year.Year}</a></li>
                                                }) : <li><a class="dropdown-item">No Data</a></li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="dropdown">
                                        <button class="btn btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Genre (optional)
                                        </button>
                                        <ul class="dropdown-menu">
                                            {
                                                searchInputMovie && searchInputMovie?.map((genre) => {
                                                    return <li><a class="dropdown-item">{genre.Genre}</a></li>
                                                })
                                            } <li><a class="dropdown-item">No Data</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col">
                                    <button class="main-search-button" onClick={() => handleClickSearch()}>Search</button>
                                </div>
                                <div class="col">
                                    <button class="main-search-button" onClick={() => handleClickWishlistPage()}>wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 mb-3 expertCon">
                        {
                            data && data.map((data) => {
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
                                                            <a class="btn btn-outline-success btn-sm" onClick={() => handleClickWishlist(data)}>Add to Watchlist</a>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <nav aria-label="...">
                        <ul class="pagination pagination-sm justify-content-center cursor-pointer">
                            {
                                page && page?.map((data, index) => {
                                    return <li class="page-item page_cursor" aria-current="page">
                                        <span class="page-link" key={index} onClick={() => handleClickPage(data, index)}>{data}</span>
                                    </li>
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default Home