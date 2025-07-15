import { useState, useEffect } from 'react'
import './App.css'
import RecipeInfo from "./Components/RecipeInfo"

const API_KEY = import.meta.env.VITE_APP_API_KEY
//instructionsRequired=true
//addRecipeNutrition=true
//number=20

function App() {
  const [inputs, setInputs] = useState({
      cuisine: "",
      diet: "",
      intolerances: "",
      maxReadyTime: 60,
      maxCarbs: 600,
    });
  const [list, setList] = useState(null);
  const [totRecipes, setTotRecipes] = useState(0);
  
  useEffect(() => {
    const fetchAllRecipes = async() => {
      const response = await fetch (
        "https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=" + API_KEY
      );
      const json = await response.json();
      setList(json);
      setTotRecipes(json.totalResults);
    }
    fetchAllRecipes().catch(console.error);
  }, [])
  
  return (
    <div>
      <h1>Recipe Dashboard</h1>
      <h3>Find a new recipe to try! Discover foods from different cuisines or a new recipe for your dietary and nutritional needs!</h3>
      <h3>Total Results: {totRecipes}</h3>
      <h3>Total Showing: 10</h3>
      <h3>Cuisines: 26</h3>
      <h3>Diets: 11</h3>
      <div className="container">
        <ul>
          {list &&
            Object.entries(list.results)
              .map(([recipe, recipeData]) => (
                <RecipeInfo
                  id={recipeData.id}
                  title={recipeData.title}
                  image={recipeData.image}
                />
              ))}
        </ul>
      </div>
    </div>
  )
}

export default App
