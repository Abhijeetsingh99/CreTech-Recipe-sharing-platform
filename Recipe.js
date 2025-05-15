const db = require('../db/database');

class Recipe {
    static getAll(callback) {
        db.all('SELECT * FROM recipes ORDER BY created_at DESC', callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM recipes WHERE id = ?', [id], callback);
    }

    static create(recipe, callback) {
        const { title, ingredients, instructions, cooking_time, difficulty } = recipe;
        db.run(
            'INSERT INTO recipes (title, ingredients, instructions, cooking_time, difficulty) VALUES (?, ?, ?, ?, ?)',
            [title, ingredients, instructions, cooking_time, difficulty],
            function(err) {
                callback(err, { id: this.lastID, ...recipe });
            }
        );
    }

    static update(id, recipe, callback) {
        const { title, ingredients, instructions, cooking_time, difficulty } = recipe;
        db.run(
            'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, cooking_time = ?, difficulty = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, ingredients, instructions, cooking_time, difficulty, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM recipes WHERE id = ?', [id], callback);
    }

    static search(query, callback) {
        db.all(
            'SELECT * FROM recipes WHERE title LIKE ? OR ingredients LIKE ? ORDER BY created_at DESC',
            [`%${query}%`, `%${query}%`],
            callback
        );
    }
}

module.exports = Recipe;