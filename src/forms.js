// Importa o módulo do Node.js para manipular o formulário
const fs = require("fs");

// Função para pegar as informações do formulário
function getFormData() {
  // Obtém o formulário do elemento HTML
  const form = document.querySelector("form");

  // Cria um objeto para armazenar as informações do formulário
  const data = {};

  // Percorre os campos do formulário
  for (const input of form.querySelectorAll("input")) {
    // Obtém o nome do campo
    const name = input.name;

    // Obtém o valor do campo
    const value = input.value;

    // Adiciona o valor do campo ao objeto data
    data[name] = value;
  }

  // Retorna o objeto data
  return data;
}

// Função para enviar as informações para o servidor
function sendData() {
  // Obtém as informações do formulário
  const data = getFormData();

  // Cria um arquivo JSON com as informações do formulário
  const json = JSON.stringify(data);

  // Escreve o arquivo JSON no disco
  fs.writeFileSync("data.json", json);
}

// Adiciona um evento de submit ao formulário
form.addEventListener("submit", sendData);