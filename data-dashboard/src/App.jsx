import { useState, useEffect } from 'react'
import './App.css'
import RecipeInfo from "./Components/RecipeInfo"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [diet, setDiet] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState(600);
  const [maxCals, setMaxCals] = useState(800);
  const [list, setList] = useState(null);
  const [totRecipes, setTotRecipes] = useState(0);
  const [totShowing, setTotShowing] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const fetchAllRecipes = async() => {
      const response = await fetch (
        "https://api.spoonacular.com/recipes/complexSearch?number=5&addRecipeNutrition=true&apiKey=" + API_KEY
      );
      const json = await response.json();
      setList(json);
      setTotShowing(20);
      setTotRecipes(json.totalResults);
    }
    fetchAllRecipes().catch(console.error);
  }, [])

  useEffect(() => {
    if (!list) return;
    console.log("API Results:", list.results);
    console.log("Total fetched:", list.results.length);
    const filterItems = () => {
      let filteredData = list.results
      if (diet) {
        filteredData = filteredData.filter((item) => 
        item.diets.includes(diet))
      }
      filteredData = filteredData.filter((item) => item.readyInMinutes <= maxReadyTime 
        && item.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount <= maxCals)
      if (searchInput) {
        filteredData = filteredData.filter((item) => 
        item.title.toLowerCase().includes(searchInput.toLowerCase()))
      }
      setFilteredResults(filteredData);
      setTotShowing(filteredData.length);
    }
    filterItems();
  }, [diet, maxReadyTime, maxCals, searchInput, list]) 
  
  return (
    <div className="container">
      <div className="header">
          <h1>Recipe Dashboard</h1>
          <h3>Find a new recipe to try!</h3>
          <br />
          <br />
      </div>

      <div className="stats">
        <h3>Total Results: {totRecipes}</h3>
        <h3>Total Showing: {totShowing}</h3>
        <h3>Cuisines: 26</h3>
        <h3>Diets: 9</h3>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => setSearchInput(inputString.target.value)}
        />
        <label htmlFor="diet">Diet: </label>
        <select name="diet" id="diet" onChange={(input) => setDiet(input.target.value)}>
          <option value="">--</option>
          <option value="gluten free">Gluten Free</option>
          <option value="keto">Keto</option>
          <option value="lacto ovo vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
        </select>
        <label htmlFor="maxReadyTime">Max Ready Time: {maxReadyTime} </label>
        <div className="slidecontainer">
          <input 
            type="range" 
            min="10" 
            max="600" 
            value={maxReadyTime} 
            className="slider" 
            id="maxReadyTime"
            onChange={(input) => setMaxReadyTime(input.target.value)}/>
        </div>
        <label htmlFor="maxCalories">Max Calories: {maxCals} </label>
        <div className="slidecontainer">
          <input 
            type="range" 
            min="50" 
            max="800" 
            value={maxCals} 
            className="slider" 
            id="maxCalories"
            onChange={(input) => setMaxCals(input.target.value)}/>
        </div>
      </div>

      <div className="dash-header">
        <h6>Image</h6>
        <h6>Name</h6>
        <h6>Servings</h6>
        <h6>Ready In (minutes)</h6>
        <h6>Calories</h6>
        <h6>Recipe Link</h6>
      </div>
      <div className="recipes">
        <ul>
          {filteredResults.map((recipeData) => (
            <RecipeInfo
              key={recipeData.id}
              title={recipeData.title}
              image={recipeData.image}
              url={recipeData.sourceUrl}
              servings={recipeData.servings}
              readyTime={recipeData.readyInMinutes}
              calories={recipeData.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
