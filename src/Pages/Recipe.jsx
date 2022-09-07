import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';


function Recipe() {

    let params = useParams()

    const [recipeDetail, setRecipeDetail] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async (id) => {
        if (localStorage.id){
            const storageData = localStorage.getItem(id);
            const data = JSON.parse(storageData);
            setRecipeDetail(data.recipes);
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_RECIPES_API_KEY}`);
            const recipe = await data.json();
            localStorage.setItem(id,JSON.stringify(recipe));
            setRecipeDetail(recipe);
        }
    }

    useEffect(()=>{
        fetchDetails(params.id);
    },[params])

    return (
        <DetailWrapper>
            <div>
                <h2>{recipeDetail.title}</h2>
                <img src={recipeDetail.image}/>
            </div>
            <Info>
                <DetailButton className={activeTab === 'instructions' ? 'active' : ''} onClick={()=>{setActiveTab('instructions')}}>Instructions</DetailButton>
                <DetailButton className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=>{setActiveTab('ingredients')}}>Ingredients</DetailButton>
                <p dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}></p>
                <p dangerouslySetInnerHTML={{ __html: recipeDetail.instructions}}></p>
                <ul>
                    {recipeDetail.extendedIngredients.map((ingredient)=>{
                    return(
                        <li>
                            {ingredient.aisle}
                        </li>
                    )
                    })}
                </ul>
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin: 5rem 10rem;
    display: flex;
    div{
        width: 50%;
        gap: 1rem;
        img {
            width: 100%;
        }
    }
    h2{
        margin-bottom: 2rem;
    }
    .active{
        background-color: rgba(0,0,0,0.2);
    }
`;

const DetailButton = styled.button`
    padding: 1rem 2rem;
    color: black;
    background: none;
    border: 1px solid black;
    outline: none;
    margin-right: 1rem;
    cursor: pointer;
`;

const Info = styled.div`
    p{
        margin: 2rem 0;
    }
`;

export default Recipe