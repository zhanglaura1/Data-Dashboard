import { Link } from "react-router-dom"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeInfo = ({id, title, image, servings, readyTime, calories}) => {
    return (
    <li className="recipe-row">
      <img src={image} alt={title} className="recipe-img" />
      <span>{title}</span>
      <span>{servings}</span>
      <span>{readyTime}</span>
      <span>{calories}</span>
      <Link style={{ color: "Blue" }} to={`/recipeDetails/${id}`} key={id}>More Info</Link>
    </li>
  );
}

export default RecipeInfo;