import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes');
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/search/${searchQuery}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error searching recipes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/recipes/${id}`, {
                method: 'DELETE'
            });
            fetchRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className="recipe-list">
            <h2>Recipe Collection</h2>
            
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={fetchRecipes}>Clear</button>
            </form>
            
            <Link to="/add" className="add-recipe-btn">Add New Recipe</Link>
            
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
                        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        <div className="recipe-actions">
                            <Link to={`/recipe/${recipe.id}`} className="view-btn">View</Link>
                            <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit</Link>
                            <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;