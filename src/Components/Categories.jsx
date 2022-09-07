import React from 'react';
import {FaPizzaSlice, FaHamburger} from "react-icons/fa";
import {GiNoodles, GiChopsticks} from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';


function Categories() {
    return (
        <List>
            
            <SLinks to={'/cuisine/italian'}>
                <FaPizzaSlice/>
                <h4>Italian</h4>
            </SLinks>
            
            <SLinks to={'/cuisine/american'}>
                <FaHamburger/>
                <h4>American</h4>
            </SLinks>
            
            <SLinks to={'/cuisine/thai'}>
                <GiNoodles/>
                <h4>Thai</h4>
            </SLinks>
            
            <SLinks to={'/cuisine/japanese'}>
                <GiChopsticks/>
                <h4>Japanese</h4>
            </SLinks>

        </List>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`

const SLinks = styled(NavLink)`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 50%;
    margin: 0 1rem;
    text-decoration: none;
    background: rgba(0,0,0,0.2);
    color: inherit;
    width: 6rem;
    height: 6rem;
    &:hover{
        text-decoration: underline;
    }
    &.active{
        background: black;
        color: white;
        svg{
            color: white;
        }
    }
`

export default Categories