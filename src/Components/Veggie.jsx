import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';

function Veggie() {

  const [veggie,setVeggie] = useState([]);

    const getVeggie = async()=>{

        if (localStorage.recipes){
            const storageData = localStorage.getItem('veggie');
            const data = JSON.parse(storageData);
            setVeggie(data.recipes);
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_RECIPES_API_KEY}&number=10&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('veggie',JSON.stringify(data));
            setVeggie(data.recipes);
        }

    }
    
    useEffect(()=>{
        getVeggie();
    },[])

    return (
        <>
        <h3 className='title'>Veggie Picks</h3>
        <Wrapper>
            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '1rem'
            }}>
                {veggie.map((recipe)=>{
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

export default Veggie