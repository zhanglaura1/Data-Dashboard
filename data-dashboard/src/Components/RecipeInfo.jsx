import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeInfo = ({title, image, url, servings, readyTime, calories}) => {
    return (
    <li className="recipe-row">
      <img src={image} alt={title} className="recipe-img" />
      <span>{title}</span>
      <span>{servings}</span>
      <span>{readyTime}</span>
      <span>{calories}</span>
      <a href={url} target="_blank" rel="noopener noreferrer">View Recipe</a>
    </li>
  );
}

export default RecipeInfo;