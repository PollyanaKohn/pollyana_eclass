const BASE_URL = 'http://localhost:3000/api/';

async function getData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Erro de link: ${response.statusText}`);
        }

        console.log(response);

        const data = await response.json();
        return data;

    } catch (error) {
        alert(`Tivemos problemas, tente novamente mais tarde ERRO: ${error}`);
    }
}

async function getJogos() {
    return getData('jogos');
}

async function getTimes() {
    return getData('times');
}

async function getCompetidores() {
    return getData('competidores');
}

async function getConfrontos() {
    return getData('confrontos');
}