import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import { BsFillHouseDoorFill } from "react-icons/bs";
import { GoMarkGithub } from 'react-icons/go';
import './css/index.css';

import SearchBar from '../../components/SearchBar'
import AdviceCard from '../../components/AdviceCard';


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
        setResearched(false);
        window.location.reload();
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
                    !researched ? ''
                    :results.length > 0 ? results.map((i, index) => <div key={index} className='cardContainer'><AdviceCard advice={i}/> </div>)
                    :"nothing found for this search"
                }
            </div>
        </>
    );
}

export default Searching;