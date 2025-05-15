import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1>Recipe Sharing Platform</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<RecipeList />} />
                        <Route path="/add" element={<RecipeForm />} />
                        <Route path="/edit/:id" element={<RecipeForm />} />
                        <Route path="/recipe/:id" element={<RecipeDetail />} />
                    </Routes>
                </main>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Recipe Sharing Platform</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;