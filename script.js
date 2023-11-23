class TodoManager {
    constructor() {
        this.taskTable = document.querySelector('.tabela-js');
        this.addTaskForm = document.querySelector('.form-js');
        this.deleteButton = document.getElementById('B-S');
        this.editButton = document.getElementById('Editar');
        this.selectedTaskId = 0;
        this.editingTask = '';

        this.loadData();
        this.setupEventListeners();
    }

    loadData() {
        axios.get('http://127.0.0.1:5000/list')
            .then(response => this.displayTasks(response.data))
            .catch(error => console.log(error));
    }

    displayTasks(tasks) {
        this.taskTable.innerHTML = '';
        tasks.forEach(task => {
            this.taskTable.innerHTML += this.createTaskTableRow(task);
        });
    }

    createTaskTableRow(task) {
        return `
            <tr>
                <th scope="row">${task.ID}</th>
                <td>${task.TAREFA}</td>
                <td>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modalexcluir" onclick="app.selectTaskForDeletion(${task.ID})">
                        <span class="material-symbols-outlined text-danger">delete</span>
                    </button>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modaleditar" onclick="app.selectTaskForEditing('${task.TAREFA}')">
                        <span class="material-symbols-outlined text-success">edit</span>
                    </button>
                </td>
            </tr>
        `;
    }

    addTask() {
        const taskInput = document.getElementById("Tarefa1");
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            const json = { Tarefa: newTask };
            axios.post('http://127.0.0.1:5000/add', json)
                .then(response => {
                    console.log("Tarefa adicionada com sucesso", response.data.Tarefa);
                    this.addTaskForm.reset();
                    this.loadData();
                })
                .catch(error => console.error("Ocorreu um erro ao adicionar", error));
        }
    }

    selectTaskForDeletion(taskId) {
        this.selectedTaskId = taskId;
    }

    confirmDeletion() {
        const url = `http://127.0.0.1:5000/delete/${this.selectedTaskId}`;
        axios.delete(url)
            .then(response => {
                console.log("Tarefa excluída com sucesso", response.data);
                this.loadData();
            })
            .catch(error => console.error("Ocorreu um erro ao excluir", error));
    }

    selectTaskForEditing(task) {
        this.editingTask = task;
    }

    confirmEditing() {
        const editedTaskInput = document.getElementById("TarefaN");
        const editedTask = editedTaskInput.value;
        const url = `http://127.0.0.1:5000/update/${this.editingTask}/${editedTask}`;
        axios.put(url)
            .then(response => {
                console.log("Tarefa atualizada com sucesso", response.data);
                this.loadData();
            })
            .catch(error => console.error("Ocorreu um erro ao atualizar", error));
    }

    setupEventListeners() {
        this.addTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask();
        });

        this.deleteButton.addEventListener('click', () => {
            this.confirmDeletion();
        });

        this.editButton.addEventListener('click', () => {
            this.confirmEditing();
        });
    }
}

const app = new TodoManager();
