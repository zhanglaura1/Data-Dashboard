import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeInfo = ({id, title, image}) => {
    const [url, setUrl] = useState("");
    const [servings, setServings] = useState(0);
    const [readyTime, setReadyTime] = useState(0);
    const [cuisines, setCuisines] = useState(null);
    const [diets, setDiets] = useState(null);
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        const getRecipeInfo = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
            );
            const json = await response.json();
            setUrl(json.sourceUrl);
            setServings(json.servings);
            setReadyTime(json.readyInMinutes);
            setCuisines(json.cuisines);
            setDiets(json.diets);
            setCalories(json.nutrition.nutrients[0].amount);
        }
        getRecipeInfo().catch(console.error);
    }, [id])

    return (
        <div>
            {url? (
                <div className="recipe-card" key={id}>
                    <h2>{title}</h2>
                    <img src={image} alt="recipe image" />
                    <div className="recipe-meta">
                        <p>Servings: {servings}</p>
                        <p>Ready in: {readyTime} minutes</p>
                        <p>Calories: {calories}</p>
                        {cuisines? (<p>Cuisines: {cuisines.join(", ")}</p>): null}
                        {diets? (<p>Diets: {diets.join(", ")}</p>): null}
                    </div>
                    <a href={url}>Find full recipe here</a>
                </div>
            ) : null}
        </div>
    )
}

export default RecipeInfo;