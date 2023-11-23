const tabela = document.querySelector('.tabela-js')
const form = document.querySelector('.form-js')
const BS = document.getElementById('B-S')
const BE = document.getElementById('Editar')
var ID = 0


const dados = {}

axios.get('http://127.0.0.1:5000/list').then((response) => {
    getData(response.data)
})
    .catch(function (error) {
        console.log(error)
    })

    
function getData(data) {
    data.map((item) => {
        tabela.innerHTML += `
            <tr>
                <th scope="row">${item.ID}</th>
                <td>${item.TAREFA}</td>
                <td><button class="btn" type="button" data-bs-toggle="modal"
                data-bs-target="#modalexcluir" onclick="excluir(${item.ID})"><span class="material-symbols-outlined text-danger">
                delete
                </span></button>
                <button class="btn" type="button" data-bs-toggle="modal"
                data-bs-target="#modaleditar" onclick="Editar(${item.TAREFA})"><span class="material-symbols-outlined text-success">
                edit
                </span></button></td>
            </tr>
            `
    })
}

function Forms(){
    const tarefa = document.getElementById("Tarefa1").value
    if (tarefa.trim() !== ""){
        const json = {Tarefa: tarefa}
        axios.post('http://127.0.0.1:5000/add', json).then((response) => {
            console.log("Tarefa adicionada com sucesso", response.Tarefa)
        })
        .catch(function (error) {
            console.error("Ouve um erro na hora de acionar",error)
        })

    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault()
    Forms()
})
function excluir(id){
    ID = id
}
BS.addEventListener('click', ()=>{
    const url = `http://127.0.0.1:5000/delete/${ID}`
    axios.delete(url).then((response) => {
        console.log("Excluido com sucesso", response.data)
    })
    .catch(function (error) {
        console.error("Ouve um erro na hora de excluir",error)
    })
})
var tarefaA;
function Editar(Tarefa){
    console.log(Tarefa)
    tarefaA = Tarefa
}
console.log(tarefaA)

BE.addEventListener('click', ()=>{
    const input = document.getElementById("TarefaN").value
    const url = `http://127.0.0.1:5000/update/${tarefaA}/${input}`
    axios.put(url).then((response) => {
        console.log("Atualizado com sucesso", response.data)
    })
    .catch(function (error) {
        console.error("Ouve um erro na hora de atualizar",error)
    })
    
})