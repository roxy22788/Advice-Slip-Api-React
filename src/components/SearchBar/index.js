import { useState } from 'react';
import './css/index.css'
import { BsSearch } from "react-icons/bs";

function SearchBar(props) {
    const [input, setInput] = useState('');

    function handleChange(event) {
        setInput(event.target.value)
    }

    function handleSubmitLocal(event) {
        event.preventDefault();
        props.handleSubmit(input);
    }
    
    return (
        <form className='containerSB' onSubmit={handleSubmitLocal} style={{width: props.wid}}>
            <input
                className='inputSB'
                value={input}
                onChange={handleChange}
                placeholder={props.place}
                required>
            </input>
            <button className='btnSB'><BsSearch /></button>
        </form>
    );
}

export default SearchBar;