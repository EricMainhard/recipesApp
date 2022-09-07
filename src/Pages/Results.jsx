import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function Results() {

    const [recipesResults, setRecipesResults] = useState([]);
    let params = useParams();

    const getResults = async (name) => {
        if (localStorage.name){
            const storageData = localStorage.getItem(name);
            const data = JSON.parse(storageData);
            setRecipesResults(data.results);
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_RECIPES_API_KEY}&number=10&query=${name}`);
            const recipes = await data.json();
            localStorage.setItem(name,JSON.stringify(recipes));
            setRecipesResults(recipes.results);
        }
    }

    useEffect(()=>{
        getResults(params.search);
    },[params.search])
    return (
        <Grid>
            {recipesResults.map((recipe)=>{
                return (
                    
                        <Card key={recipe.id}>
                          <Link to={`/recipe/${recipe.id}`}>
                              <img src={recipe.image}/>
                              <h4>{recipe.title}</h4>
                          </Link>
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

export default Results