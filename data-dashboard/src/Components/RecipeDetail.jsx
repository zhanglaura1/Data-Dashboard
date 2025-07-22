import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeDetail = () => {
    const { id } = useParams();
    const [fullDetails, setFullDetails] = useState({
        title: "",
        image: null,
        url: null,
        servings: 0,
        readyTime: 0,
        cuisines: [],
        diets: [],
        calories: 0
    });
    
    useEffect(() => {
        const getRecipeDetail = async () => {
            const response = await fetch (
                `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=` + API_KEY
            )
            const json = await response.json();
            setFullDetails({
                title: json.title,
                image: json.image,
                url: json.sourceUrl,
                servings: json.servings,
                readyTime: json.readyInMinutes,
                cuisines: json.cuisines,
                diets: json.diets,
                calories: json.nutrition?.nutrients?.[0]?.amount || 0,
            })
        }
        if (id) getRecipeDetail().catch(console.error)
    }, [id])

    return (
        <div>
            <h1>{fullDetails.title}</h1>
            <img className="detail-img" src={fullDetails.image} alt="recipe image" />
            <div className="detail-stats">
                <h3>Servings: {fullDetails.servings}</h3>
                <h3>Ready in: {fullDetails.readyTime} minutes</h3>
                <h3>Calories: {fullDetails.calories}</h3>
            </div>
            <h4>Cuisines: {fullDetails.cuisines.join(", ")}</h4>
            <h4>Diets: {fullDetails.diets.join(", ")}</h4>
            <a href={fullDetails.url} target="_blank">Click here for recipe link</a>
        </div>
    )
}

export default RecipeDetail