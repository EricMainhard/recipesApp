import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Cuisine() {

  const [cusine, setCusine] = useState([]);
  let params = useParams();

  const getCusine = async(name) => {
    if (localStorage.name){
      const storageData = localStorage.getItem(name);
      const data = JSON.parse(storageData);
      setCusine(data.results)
    } else {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_RECIPES_API_KEY}&number=10&cuisine=${name}`);
      const recipes = await data.json();
      localStorage.setItem(name,JSON.stringify(recipes));
      setCusine(recipes.results);
    }
  }
  useEffect(()=>{
    getCusine(params.type);
  },[params.type])

  return (
    <Grid>
      {cusine.map((recipe)=>{
        return(
        
          <Card key={recipe.id}>
            <img src={recipe.image}/>
            <h4>{recipe.title}</h4>
          </Card>
        
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 3rem;
  max-width: 1000px;
  margin: auto;
`

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`

export default Cuisine