const tabela = document.querySelector('.tabela-js');
const form = document.querySelector('.form-js');
const BS = document.getElementById('B-S');
const BE = document.getElementById('Editar');
let ID = 0;
let tarefaA = '';

const dados = {};

axios.get('http://127.0.0.1:5000/list')
    .then(response => getData(response.data))
    .catch(error => console.log(error));

function getData(data) {
    tabela.innerHTML = ''; 
    data.map(item => {
        tabela.innerHTML += `
            <tr>
                <th scope="row">${item.ID}</th>
                <td>${item.TAREFA}</td>
                <td>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modalexcluir" onclick="excluir(${item.ID})">
                        <span class="material-symbols-outlined text-danger">delete</span>
                    </button>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modaleditar" onclick="Editar('${item.TAREFA}')">
                        <span class="material-symbols-outlined text-success">edit</span>
                    </button>
                </td>
            </tr>
        `;
    });
}

function Forms() {
    const tarefa = document.getElementById("Tarefa1").value;
    if (tarefa.trim() !== "") {
        const json = { Tarefa: tarefa };
        axios.post('http://127.0.0.1:5000/add', json)
            .then(response => {
                console.log("Tarefa adicionada com sucesso", response.data.Tarefa);
                form.reset(); 
            })
            .catch(error => console.error("Ocorreu um erro ao adicionar", error));
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    Forms();
});

function excluir(id) {
    ID = id;
}

BS.addEventListener('click', () => {
    const url = `http://127.0.0.1:5000/delete/${ID}`;
    axios.delete(url)
        .then(response => console.log("Excluído com sucesso", response.data))
        .catch(error => console.error("Ocorreu um erro ao excluir", error));
});
