import React, { useState } from 'react';
import './Content.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import env from '../../settings';

function Content() {
    const [input, setInput] = useState("")
    const [music, setMusic] = useState([])
    const [load, setLoad] = useState(false)

    let handleSearch = async () => {
        setInput("")
        if (input === "") {
            alert("No input found")
        } else {
            try {
                setLoad(true)
                let music_data = await axios.get(`${env.musicapi}${input}`)
                await setMusic([...music_data.data.results])
                setLoad(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="apisearch-container" id="apisearch__container">
                <div className="col-md-4 col-lg-5 mt-3">
                    <div className="input-group mb-3">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="form-control" placeholder="Search your favourite song" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleSearch()}>Search</button>
                    </div>
                </div>
                <hr />
            </div>

            <div className="card-container" id="apicard__container">
                <h2>Search results:</h2>
                {!load ? "" : <h1 className="text-center">Loading...</h1>}
                <div className="row">
                    {
                        music.map((obj) => {
                            var songname = obj.title;
                            songname = songname.replace(/&quot;/g, '"');
                            var id = obj.id;
                            return (
                                <div className="card-group col-lg-2 mt-3" id="apicard__group">
                                    <div className="card" id="apicard">
                                        <Link to={`/player/${id}`} style={{ "textDecoration": "none" }}>
                                            <img src={obj.images["500x500"]} className="card-img-top" alt="song" />
                                            <div className="card-body" id="apicard__body">
                                                <h5 className="card-title text-center">{songname}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Content
