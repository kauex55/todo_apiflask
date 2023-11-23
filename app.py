from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    open('Text.csv', 'x')
    with open("Text.csv", "w") as arquivo:
         arquivo.write("ID,TAREFA\n") 
except:
    pass

@app.route("/list", methods=['GET'])
def listarTarefas():    
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')    
    return jsonify(tarefas)

@app.route("/add", methods=['POST'])
def addTarefas():
    item = request.json  
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records') 
    id = len(tarefas) + 1
    with open("Text.csv", "a") as arquivo:
        arquivo.write(f"{id},{item['Tarefa']}\n")    

    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')        
    return jsonify(tarefas)

@app.route('/update/<string:tarefa_antiga>/<string:tarefa_nova>', methods=['PUT'])
def update_user(tarefa_antiga, tarefa_nova):
    tarefas = pd.read_csv('Text.csv')

    for index, row in tarefas.iterrows():
        if row['TAREFA'] == tarefa_antiga:
            tarefas.at[index, 'TAREFA'] = tarefa_nova
            tarefas.to_csv('Text.csv', index=False)
            return "Tarefa alterada com sucesso"
    return "Tarefa não encontrada"

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    tarefas = pd.read_csv('Text.csv')

    if id in tarefas['ID'].values:
        tarefas = tarefas[tarefas['ID'] != id]
        tarefas['ID'] = range (1, len(tarefas) + 1)

        tarefas.to_csv('Text.csv', index=False)
        return "Tarefa excluida com sucesso"
    return "Id não encontrada"


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")