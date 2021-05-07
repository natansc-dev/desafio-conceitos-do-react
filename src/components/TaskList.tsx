import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //1. Criar uma variavel com o valor tipo numero que seja aleatorio.
    //2. Verificar se o input foi preenchido.
    //3. Inserir uma nova tarefa, MANTENDO as demais tasks
    //4. Apos a inclusao da nova tarefa, limpar input

    const idTask = Math.floor(Math.random() * 999)

    //newTaskTitle = Valor do input
    if (newTaskTitle == "") {
      alert("Preencha o campo 'Adicionar nova task'")
    } else {
      setTasks(listedTask => [...listedTask, {id: idTask, title:newTaskTitle, isComplete: false}])
      setNewTaskTitle("")
      console.log("Tanks adicionada com sucesso!")
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //Criar um novo array, com a task que foi informada(id) marcada como concluida
    //1. Listar todos os itens do array
    //2. Verificar qual item do array corresponde ao id enviado via paramentro
    //3. Retornar todas as tasks, porem com a task que corespondeu a verificacao com o isComplete false

    const finishTask = tasks.map(tasks => tasks.id === id ? {...tasks, isComplete: !tasks.isComplete} : tasks)
    setTasks(finishTask)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //Criar um novo array, sem a task que foi informa (id)
    //No caso enviamos todas as tarefas que possuiam o id diferente do que foi informado como parametro
    
    const filteredTasks = tasks.filter(tasks => tasks.id !== id)
    setTasks(filteredTasks)
    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}