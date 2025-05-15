import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail">
            <button onClick={() => navigate(-1)} className="back-btn">Back to Recipes</button>
            
            <h2>{recipe.title}</h2>
            
            <div className="recipe-meta">
                <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                <p><strong>Created:</strong> {new Date(recipe.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="recipe-section">
                <h3>Ingredients</h3>
                <div className="ingredients-list">
                    {recipe.ingredients.split('\n').map((ingredient, index) => (
                        <p key={index}>{ingredient}</p>
                    ))}
                </div>
            </div>
            
            <div className="recipe-section">
                <h3>Instructions</h3>
                <div className="instructions-list">
                    {recipe.instructions.split('\n').map((instruction, index) => (
                        <p key={index}>{instruction}</p>
                    ))}
                </div>
            </div>
            
            <div className="recipe-actions">
                <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">Edit Recipe</button>
            </div>
        </div>
    );
}

export default RecipeDetail;