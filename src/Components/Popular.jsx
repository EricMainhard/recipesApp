import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';

function Popular() {

    const [popular,setPopular] = useState([]);

    const getPopular = async()=>{

        if (localStorage.popular){
            const storageData = localStorage.getItem('popular');
            const data = JSON.parse(storageData);
            setPopular(data.recipes);
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_RECIPES_API_KEY}&number=10`);
            const data = await api.json();
            localStorage.setItem('popular',JSON.stringify(data));
            setPopular(data.recipes);
        }

    }
    
    useEffect(()=>{
        getPopular();
    },[])

    return (
        <>
        <h3 className='title'>Random Picks</h3>
        <Wrapper>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '1rem'
            }}>
                {popular.map((recipe)=>{
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title}/>
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0;
`

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    p{
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,0%);
        color: white;
        width: 100%;
        text-align: center;
        z-index: 2;
    }

    img{
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-top: 1rem;
        position: absolute;
        left: 0;
        filter: brightness(0.9);
    }
`

export default Popular