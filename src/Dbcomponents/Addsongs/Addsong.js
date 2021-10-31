import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Addsong.css';
import env from '../../settings';

function Addsong() {

    const [songInput, setSongInput] = useState("")
    const [toAddData, setToAddData] = useState([])
    const finalData = []

    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState(false)

    let history = useHistory();

    let songSearch = async () => {
        setSearch(true)
        setSongInput("")
        try {
            let data = await axios.get(`${env.musicapi}${songInput}`)
            for (let i = 0; i < data.data.results.length; i++) {
                let api_data = data.data.results[i].id
                var finalapi_data = [api_data]
                for (let j = 0; j < finalapi_data.length; j++) {
                    var finaldata_id = finalapi_data[j]
                    var finalsongdata = await axios.get(`${env.finalmusicapi}${finaldata_id}`)
                    finalData.push(finalsongdata.data)
                }
                setToAddData(finalData)
            }
            setSearch(false)
        } catch (error) {
            setTimeout(() => {
            alert("Improper Link!")
            history.push("/DbContent")
            console.log(error)
            }, 10000);

        }
    }

    let handleadd = async (data) => {
        try {
            setLoad(true)
            let postData = await axios.post(`${env.api}/addSong/${data.albumid}`, { data })
            setLoad(false)
            history.push("/DbContent")
        }
        catch (error) {
            alert("Already in Playlist")
            history.push("/DbContent")
            console.log(error)
        }
    }


    return (
        <>
            <div className="dbsearch-container" id="dbsearch__container">
                <div className="col-md-4 col-lg-5 mt-3">
                    <div className="input-group mb-3">
                        <input type="text" value={songInput} onChange={(e) => setSongInput(e.target.value)} className="form-control" placeholder="Search your favourite song" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => songSearch()}>Search</button>
                    </div>
                </div>
                <hr />
            </div>

            <div className="card-container" id="addcard__container">
                <h2>Search results:</h2>
                {!search ? "" : <h1>Searching...</h1>}
                {!load ? "" : <h1>Adding...</h1>}
                <div className="row">
                    {
                        toAddData.map((obj) => {
                            var songname = obj.song;
                            songname = songname.replace(/&quot;/g, '"');
                            songname = songname.replace(/&#039;/g, " ")
                            return (
                                <div className="card-group col-lg-2 mt-3" id="addcard__group">
                                    <div className="card" id="addcard">
                                        <img src={obj.images["500x500"]} className="card-img-top" alt="song" />
                                        <div className="card-body" id="addcard__body">
                                            <h5 className="card-title text-center">{songname}</h5>
                                        </div>
                                        <button className="btn btn-success mb-2" style={{ "margin": "0 25px" }} onClick={() => handleadd(obj)}><i className="fa fa-plus" aria-hidden="true"></i> Playlist</button>
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

export default Addsong
