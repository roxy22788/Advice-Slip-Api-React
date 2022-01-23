import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import { BsFillHouseDoorFill } from "react-icons/bs";
import { GoMarkGithub } from 'react-icons/go';
import './css/index.css';

import SearchBar from '../../components/SearchBar'
import AdviceCard from '../../components/AdviceCard';

import colors from '../../components/AdviceCard/data/colors';


function Searching() {
    let params = useParams();
    let navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [researched, setResearched] = useState(false);
    
    useEffect(() => {
        document.title = decodeURIComponent(params.id) + ' - Advice slip';
        
        axios.get("https://api.adviceslip.com/advice/search/" + params.id)
        .then((response) => {
            if (response.data.hasOwnProperty("total_results")) {
                let aux = response.data.slips.map((i) => i.advice);
                setResults(aux);
            }
        })
        .catch(() => {
            console.log("ops deu errado");
        })

        setResearched(true);
    }, []);

    function handleSubmitSB(event) {
        let uriCode = encodeURIComponent(event);
        navigate(`/search_query=${uriCode}`);
        search(uriCode)
    }

    function search(uriCode) {   
        setResults([]);

        axios.get("https://api.adviceslip.com/advice/search/" + uriCode)
        .then((response) => {
            if (response.data.hasOwnProperty("total_results")) {
                let aux = response.data.slips.map((i) => i.advice);
                setResults(aux);
            }
        })
        .catch(() => {
            console.log("ops deu errado");
        })

        document.title = decodeURIComponent(uriCode) + ' - Advice slip';
    }

    function randomColor(cls) {
        return cls[Math.floor(Math.random() * cls.length)];
    }

    return (
        <>
            <header className='headerSB'>
                <Link to='/' className='btnHomeSearching'>
                    <BsFillHouseDoorFill />
                </Link>
                <SearchBar 
                    place='Search Advice'
                    handleSubmit={handleSubmitSB}
                    wid={500}
                />
                <a 
                    href='https://github.com/roxy22788' 
                    target='_blank' 
                    rel="noreferrer" 
                    className='btnGithub'
                >
                    <GoMarkGithub />
                </a>
            </header>
            <div className='cardsContainer'>
                {
                    results.length > 0 ? results.map((i, index) => <div key={index} className='cardContainer'><AdviceCard advice={i} color={randomColor(colors)}/> </div>)
                    :"nothing found for this search"
                }
            </div>
        </>
    );
}

export default Searching;