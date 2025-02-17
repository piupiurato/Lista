document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
    let input = document.getElementById("tarefa");
    let textoTarefa = input.value.trim();
    
    if (textoTarefa === "") {
        alert("Escreve uma tarefa primeiro!");
        return;
    }

    let lista = document.getElementById("lista-tarefas");
    let item = document.createElement("li");
    
    item.innerHTML = `
        ${textoTarefa}
        <button onclick="removerTarefa(this)">❌</button>
    `;

    item.addEventListener("click", () => {
        item.classList.toggle("concluida");
        guardarTarefas();
    });

    lista.appendChild(item);
    input.value = "";

    guardarTarefas();
}

function removerTarefa(botao) {
    botao.parentElement.remove();
    guardarTarefas();
}

function guardarTarefas() {
    let tarefas = [];
    document.querySelectorAll("#lista-tarefas li").forEach(item => {
        tarefas.push({
            texto: item.textContent.replace("❌", "").trim(),
            concluida: item.classList.contains("concluida"),
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach(tarefa => {
        let lista = document.getElementById("lista-tarefas");
        let item = document.createElement("li");

        item.innerHTML = `
            ${tarefa.texto}
            <button onclick="removerTarefa(this)">❌</button>
        `;

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.addEventListener("click", () => {
            item.classList.toggle("concluida");
            guardarTarefas();
        });

        lista.appendChild(item);
    });
}
