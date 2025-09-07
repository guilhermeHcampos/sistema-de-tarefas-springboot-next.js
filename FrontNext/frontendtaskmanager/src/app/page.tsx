// src/app/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { getAllTasks, createTask, deleteTask, updateTask, Task } from "@/services/taskService";

const STATUS_OPTIONS = ["PENDENTE", "EM ANDAMENTO", "FEITO"];

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");


    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");

    // Função para carregar as tarefas da API
    const loadTasks = async () => {
        try {
            setIsLoading(true);
            const data = await getAllTasks();
            setTasks(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Função para lidar com a criação de uma nova tarefa
    const handleCreateTask = async (e: FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;
        try {
            const newTask = { title: newTitle, description: newDescription, status: "PENDENTE" };
            await createTask(newTask);
            setNewTitle("");
            setNewDescription("");
            await loadTasks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Função para lidar com a deleção de uma tarefa
    const handleDeleteTask = async (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            try {
                await deleteTask(id);
                setTasks(tasks.filter((task) => task.id !== id));
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    // Ativa o modo de edição para uma tarefa específica
    const handleStartEdit = (task: Task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
        setEditingDescription(task.description);
    };

    // Cancela o modo de edição
    const handleCancelEdit = () => {
        setEditingTaskId(null);
    };

    // Salva as alterações feitas no título e descrição
    const handleSaveEdit = async (id: number) => {
        const taskToUpdate = tasks.find(t => t.id === id);
        if (!taskToUpdate) return;

        try {
            const updatedTask = await updateTask(id, {
                title: editingTitle,
                description: editingDescription,
                status: taskToUpdate.status
            });
            // Atualiza a lista de tarefas no frontend com os novos dados
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
            setEditingTaskId(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        const taskToUpdate = tasks.find(t => t.id === id);
        if (!taskToUpdate) return;

        try {
            const updatedTaskData = {
                ...taskToUpdate,
                status: newStatus
            };
            const updatedTask = await updateTask(id, updatedTaskData);
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        } catch (err: any) {
            setError(err.message);
        }
    };


    if (isLoading) return <main className="p-8"><p>Carregando...</p></main>;
    if (error) return <main className="p-8"><p className="text-red-500">Erro: {error}</p></main>;

    return (
        <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
            {/* Formulário para Nova Tarefa (sem alterações) */}
            <div className="w-full max-w-2xl mb-12 bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Criar Nova Tarefa</h2>
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título</label>
                        <input id="title" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                        <textarea id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={3}/>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Adicionar Tarefa</button>
                </form>
            </div>

            {/* Lista de Tarefas com Lógica de Edição */}
            <h1 className="text-4xl font-bold mb-8">Lista de Tarefas</h1>
            <div className="w-full max-w-2xl">
                {tasks.length > 0 ? (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li key={task.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                {editingTaskId === task.id ? (

                                    <div className="space-y-3">
                                        <input type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" />
                                        <textarea value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" rows={3} />
                                        <div className="flex gap-2">
                                            <button onClick={() => handleSaveEdit(task.id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">Salvar</button>
                                            <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded">Cancelar</button>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold">{task.title}</h2>
                                            <p className="text-gray-400 mt-1">{task.description}</p>
                                            {/* Seletor de Status */}
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                className="mt-3 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                            >
                                                {STATUS_OPTIONS.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Botões de Ação */}
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => handleStartEdit(task)} className="bg-green-600 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded">Editar</button>
                                            <button onClick={() => handleDeleteTask(task.id)} className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Deletar</button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma tarefa encontrada. Crie uma nova acima!</p>
                )}
            </div>
        </main>
    );
}