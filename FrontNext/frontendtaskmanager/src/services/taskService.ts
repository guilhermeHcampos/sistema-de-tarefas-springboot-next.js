// src/services/taskService.ts

const API_URL = "http://localhost:8080/api/tasks";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

// Buscar todas as tarefas
export const getAllTasks = async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Falha ao buscar as tarefas.");
    }
    return response.json();
};

// Criar uma nova tarefa
// Omitimos o 'id' porque o backend vai gerá-lo
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) {
        throw new Error("Falha ao criar a tarefa.");
    }
    return response.json();
};

// Deletar tarefa
export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Falha ao deletar a tarefa.");
    }
};

// Atualizar tarefa
export const updateTask = async (id: number, taskData: Partial<Omit<Task, 'id'>>): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) {
        throw new Error("Falha ao atualizar a tarefa.");
    }
    return response.json();
}