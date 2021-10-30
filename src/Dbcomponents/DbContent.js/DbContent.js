import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DbContent.css';
import { Link } from 'react-router-dom';
import env from '../../settings';

function DbContent() {
    const [music, setMusic] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        handlefetch()
    }, [])

    let handlefetch = async () => {
        let data = await axios.get(`${env.api}/DbContent`)
        setMusic([...data.data])
        setLoad(false)
    }

    let handledelete = async (id) => {
        try {
            setLoad(true)
            await axios.delete(`${env.api}/deletesong/${id}`)
            handlefetch()
            setLoad(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                load ? <h1 className="db-loader">Loading...</h1> :
                    <div className="addsongs-container" id="addsongs__container">
                        <h1><u>Playlist Music</u> :</h1>
                        <Link to="/addSong">
                            <button className="bt btn-dark"><i className="fa fa-plus" aria-hidden="true"></i> Songs</button>
                        </Link>
                    </div>
            }
            <div className="card-container" id="dbcard__container">
                <div className="row">
                    {
                        music.map((obj) => {
                            var songname = obj.song;
                            songname = songname.replace(/&quot;/g, '"');
                            return (
                                <div className="card-group col-lg-3 mt-2" id="dbcard__group">
                                    <div className="card bg-dark" id="dbcard">
                                        <img src={obj.images["500x500"]} style={{ "padding": "10px", "borderRadius": "15px" }} className="card-img-top" alt="song" />
                                        <div className="card-body" id="dbcard__body">
                                            <h5 className="card-title text-center" style={{ "color": "white" }}>{songname}</h5>
                                            <p className="card-text mb-0" style={{ "color": "white" }}>Signers:</p>
                                            <p className="card-text" style={{ "color": "white" }}>{obj.primary_artists}</p>
                                        </div>
                                        <audio src={obj.media_urls["320_KBPS"]} style={{ "width": "auto", "margin": "0 10px" }} className="mb-2" controls loop />
                                        <button className="btn btn-danger mb-2" onClick={() => handledelete(obj._id)} style={{ "margin": " 0 50px" }}><i className="fa fa-trash-o" aria-hidden="true"></i> from Playlist</button>
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

export default DbContent
