import { promises as fs } from 'fs';

async function readTodos() {
    try {
        const data = await fs.readFile('todos.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file', err);
        return [];
    }
}

async function writeTodos(todos) {
    try {
        await fs.writeFile('todos.json', JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error('Error writing to file', err);
        throw err;
    }
}

export { readTodos, writeTodos };
