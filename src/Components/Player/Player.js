import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import env from '../../settings'
import { Link } from 'react-router-dom';
import './Player.css'

function Player() {
    const [load, setLoad] = useState(false)
    const [finalizedData, setFinalizedData] = useState([])
    var { id } = useParams()

    useEffect(() => {
        playerData();
    }, [])

    let playerData = async () => {
        setLoad(true)
        try {
            let data = await axios.get(`${env.finalmusicapi}${id}`)
            setFinalizedData([data.data])
            setLoad(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="player text-center">
                {!load ? "" : <h1>Loading...</h1>}
            </div>
            {
                finalizedData.map((obj) => {
                    var songname = obj.song;
                    songname = songname.replace(/&quot;/g, '"');
                    var singer = obj.primary_artists;
                    return (
                        <>
                            <div className="player-box" id="apiplayer__box" style={{ "textAlign": "-webkit-center" }}>
                                <div className="card text-white bg-dark mb-3" style={{ "maxWidth": "19rem", "borderRadius": "15px" }}>
                                    <img className="card-header" alt="song" src={obj.images["500x500"]} style={{ "padding": "8px 8px", "borderRadius": "15px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Song Name: {songname}</h5>
                                        <hr />
                                        <p className="card-text mb-0">Signers:</p>
                                        <p className="card-text">{singer}</p>
                                    </div>
                                    <audio src={obj.media_urls["320_KBPS"]} style={{ "width": "auto", "margin": "0 10px" }} className="mb-2" controls autoPlay />
                                    <Link to="/apimusic" className="btn btn-danger mt-2" id="apiplayerback">
                                        <i className="fa fa-chevron-left" aria-hidden="true"></i> Go back
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Player
