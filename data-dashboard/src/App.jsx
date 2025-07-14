import { useState, useEffect } from 'react'
import './App.css'

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
      minProtein: 10,
      totalRecipes: 0,
    });

  const [list, setList] = useState(null);
  
  useEffect(() => {
    const fetchAllRecipes = async() => {
      const response = await fetch (
        "https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=" + API_KEY
      );
      const json = await response.json();
      setList(json);
    }
    fetchAllRecipes().catch(console.error);
  }, [])
  
  return (
    <div>
      <h1>Recipe Dashboard</h1>
      <h3>Find a new recipe to try! Discover foods from different cuisines or a new recipe for your dietary and nutritional needs!</h3>
      <h3>Total Results: {inputs.totalRecipes}</h3>
      <h3>Cuisines: 26</h3>
      <h3>Diets: 11</h3>
      <div className="container">
        <ul>
          {list &&
            Object.entries(list.results)
              .map(([recipe, recipeData]) => (
                <li key={recipeData.id}>{recipeData.title}</li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default App
