import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeInfo = ({id, title, image, url, servings, readyTime, calories}) => {
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
                    </div>
                    <a href={url}>Find full recipe here</a>
                </div>
            ) : null}
        </div>
    )
}

export default RecipeInfo;