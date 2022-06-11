const express = require('express');
const bills = require("./boletosF");
const router = express.Router();


// 100 - status de processamento;
// 200 - status OK;
// 300 - status de rota removida ou remanejada;
// 400 - status de erro;
// 500 - erros de servidor.

const peopleList = [
    {
        name: "Leo",
        cpf: "12345678",
        id: 1,
    },
    {
        name: "GustaXL",
        cpf: "87654321",
        id: 2,
    },
];

const getPeople = () => {
    return peopleList;
}

const getPerson = (id) => {
    const pessoa = getPeople().find(p => p.id == id);
    return pessoa;
}

const createPerson = (pessoa) => {
    pessoa.id = getPeople().length + 1;
    getPeople().push(pessoa);
    return pessoa;
}


const deletePerson = (id) => {

    const index = getPeople().findIndex(p => p.id === id);
    getPeople().splice(index, 1);

    return getPeople();
}

const checkBoleto = (id) => {
    const boleto = bills.getBills().find(b => b.person_id == id);
    return boleto ? false : true;
}

// ROUTES

router.post('/', (req, res) => {
    const pessoa = req.body;
    pessoa.name && pessoa.cpf ? res.json(createPerson(pessoa)) : res.status(400).send("Pessoa não possui nome E/OU cpf");
})


router.get('/', (req, res) => {
    res.send(getPeople())
});


router.get('/:id', (req, res) => {
    const person = getPerson(req.params.id);
    res.json(person);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    checkBoleto(id) ? res.json(deletePerson(id)) : res.status(400).send("The person you tried to delete is related with a bill"); 
})

router.put('/:id', (req, res) => {
    const person = getPerson(req.params.id);
    person.name = req.body.name;
    person.cpf = req.body.cpf;
    res.json(person);
})


module.exports = {
    router,
    getPerson
}