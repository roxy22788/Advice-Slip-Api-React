import { useNavigate } from "react-router-dom";

import './css/index.css';

import SearchBar from "../../components/SearchBar";

function Home() {
    let navigate = useNavigate();

    function handleSubmitLocal(event) {
        let uriCode = encodeURIComponent(event);
        navigate(`/search_query=${uriCode}`);
    }

    return (
        <div className='homeContainer'>
            <SearchBar 
                place='Search Advice'
                wid={700}
                handleSubmit={handleSubmitLocal}
            />
        </div>
    );
}

export default Home;