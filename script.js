const tabela = document.querySelector('.tabela-js');
const form = document.querySelector('.form-js');
const BS = document.getElementById('B-S');

axios.get('http://127.0.0.1:5000/list')
    .then(response => exibirDados(response.data))
    .catch(erro => console.log(erro));

function exibirDados(dados) {
    tabela.innerHTML = ''; 
    dados.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <th scope="row">${item.ID}</th>
                <td>${item.TAREFA}</td>
                <td>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modalexcluir" onclick="excluirTarefa(${item.ID})">
                        <span class="material-symbols-outlined text-danger">delete</span>
                    </button>
                    <button class="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#modaleditar" onclick="editarTarefa('${item.TAREFA}')">
                        <span class="material-symbols-outlined text-success">edit</span>
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener('submit', async function (evento) {
    evento.preventDefault();
    const tarefa = document.getElementById("Tarefa1").value;
    if (tarefa.trim() !== "") {
        try {
            const resposta = await axios.post('http://127.0.0.1:5000/adicionar', { Tarefa: tarefa });
            console.log("Tarefa adicionada com sucesso:", resposta.data.Tarefa);
            form.reset(); 
        } catch (erro) {
            console.error("Erro ao adicionar a tarefa:", erro);
        }
    }
});

function excluirTarefa(id) {
    const url = `http://127.0.0.1:5000/excluir/${id}`;
    axios.delete(url)
        .then(resposta => console.log("Tarefa excluída com sucesso:", resposta.data))
        .catch(erro => console.error("Erro ao excluir a tarefa:", erro));
}

function editarTarefa(id, tarefaAtual) {
    const novaTarefa = prompt("Editar tarefa:", tarefaAtual);
    
    if (novaTarefa !== null) {
        const url = `http://127.0.0.1:5000/update/${id}/${novaTarefa}`;
        axios.put(url)
            .then(resposta => {
                console.log("Tarefa editada com sucesso:", resposta.data);
            })
            .catch(erro => console.error("Erro ao editar a tarefa:", erro));
    }

}
