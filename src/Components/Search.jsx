import React, {useEffect, useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Search() {

    const navigate = useNavigate();

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/results/' + searchValue);
    }

    const [searchValue, setSearchValue] = useState('');

    return (
        <FormStyle onSubmit={(e)=>{onSubmit(e)}}>
            <div>
                <FaSearch/>
                <input type="text" id="searchInput" value={searchValue} onChange={(e)=>{onSearch(e)}}/>
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        position: relative;   
    }
    input {
        margin-top: 2rem;
        border: none;
        font-size: 1.4rem;
        color: white;
        background: rgba(0,0,0,0.2);
        border-radius: 1rem;
        outline: none;
        padding: 1rem 3rem;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, 50%);
        color: white;
    }
`;

export default Search