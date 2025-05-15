import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeForm() {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        cooking_time: '',
        difficulty: 'Easy'
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            fetchRecipe();
        }
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = isEdit 
                ? `http://localhost:5000/api/recipes/${id}`
                : 'http://localhost:5000/api/recipes';
                
            const method = isEdit ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe)
            });
            
            if (response.ok) {
                navigate(isEdit ? `/recipe/${id}` : '/');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    return (
        <div className="recipe-form">
            <h2>{isEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={recipe.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Ingredients:</label>
                    <textarea
                        name="ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                        required
                        rows="5"
                    />
                </div>
                
                <div className="form-group">
                    <label>Instructions:</label>
                    <textarea
                        name="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                        required
                        rows="8"
                    />
                </div>
                
                <div className="form-group">
                    <label>Cooking Time (minutes):</label>
                    <input
                        type="number"
                        name="cooking_time"
                        value={recipe.cooking_time}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label>Difficulty:</label>
                    <select
                        name="difficulty"
                        value={recipe.difficulty}
                        onChange={handleChange}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                
                <button type="submit" className="save-btn">
                    {isEdit ? 'Update Recipe' : 'Save Recipe'}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="cancel-btn">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default RecipeForm;