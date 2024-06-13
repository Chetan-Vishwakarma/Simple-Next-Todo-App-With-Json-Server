import { Todo } from "@/type/todoType";


const baseUrl:string = "http://localhost:3002/tasks";

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(baseUrl, {cache:'no-cache'});
    return await response.json();
}

export const addTodo = async (todo:Todo): Promise<Todo> => {
    const response = await fetch(baseUrl,{
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': "application/json"
        }
    });
    return await response.json();
}

export const deleteTodo = async (id:string) => {
    await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    });
}

export const editTodo = async (todo: Todo) => {
    const response = await fetch(`${baseUrl}/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': "application/json"
        }
    });
    return await response.json();
}