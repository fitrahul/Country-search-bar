import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./home.css"

const Home = () => {
    const [input, setInput] = useState("");
    const [country, setCountry] = useState([]);
    const [one_country, setOne_country] = useState();

    function getCountry() {
        axios.get("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json").then((res) => {
            // console.log(res.data);
            var data = res.data;
            setCountry(data);
        })
    }

    const handleClick = () => {
        axios.get("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json").then((res) => {
            // console.log(res.data);
            var data = res.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].name === input) {
                    // console.log("data: ",data[i].name);
                    setOne_country(data[i])
                }
            }
            // console.log("country: ",one_country);
            setInput("");
        })
    }

    useEffect(() => {
        getCountry();
    }, []);

    if (one_country) {
        return (
            <>
                <br />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                    placeholder='Search Country' />
                <button onClick={handleClick}>Search</button>
                <br /><hr />
                <div>
                    <img src={`${one_country.flag}`} alt="" />
                    <p>{one_country.name}</p>
                    <p>{one_country.population}</p>
                    <p>{one_country.region}</p>
                    <p>{one_country.capital}</p>
                </div>
            </>
        )
    }
    else {
        return (
            <div>
                <br />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                    placeholder='Search Country' />
                <button onClick={handleClick}>Search</button>
                <br /><hr />
                <div className='countries'>
                    {country.map((el) => (
                        <div className='countries_1'>
                            <img src={`${el.flag}`} alt="" />
                            <p>{el.name}</p>
                            <p>{el.population}</p>
                            <p>{el.region}</p>
                            <p>{el.capital}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Home
