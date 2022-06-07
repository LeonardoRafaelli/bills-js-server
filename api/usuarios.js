const express = require('express');
const router = express.Router();

const listaUsuarios = [
    {
        id: 1,
        nome: "Leonardo",
        senha: "12345678",
    },
    {
        id: 2,
        nome: "Rafaelli",
        senha: "87654321",
    },
];

// Respostas de informação (100-199),
// Respostas de sucesso (200-299),
// Redirecionamentos (300-399),
// Erros do cliente (400-499),
// Erros do servidor (500-599).

const fetchUsers = () => {
    return listaUsuarios;
};

const fetchUser = (id) => {
    return fetchUsers().find(u => u.id == id);
}

const createUser = (user) => {
    user.id = fetchUsers().length + 1;
    fetchUsers().push(user);
    return user;
}

const updateUser = (newUser, id) => {
    const user = fetchUser(id);
    user.nome = newUser.body.nome;
    user.senha = newUser.body.senha;
    return user;
}

const deleteUser = (id) => {
    const index = fetchUsers().findIndex(u => u.id == id);
    fetchUsers().splice(index, 1);
    return fetchUsers();
}

//  ROUTES

router.get('/', (req, res) => {
    const usersList = fetchUsers();
    res.json(usersList)
});

router.get('/:id', (req, res) => {
    const fetchedUser = fetchUser(req.params.id);
    res.json(fetchedUser);
})

router.post('/', (req, res) => {
    const user = req.body;
    user.nome ? user.nome : res.status(400).send("It's not possible to register/update an user with no name.");
    user.senha ? user.senha : res.status(400).send("It's not possible to register/update an user with no password.");

    const newUser = createUser(user);
    res.json(newUser);
})

router.delete('/:id', (req, res) => {
    const newList = deleteUser(req.params.id);
    res.json(newList);
})

router.put('/:id', (req, res) => {
    const user = req.body;
    user.nome ? user.nome : res.status(400).send("It's not possible to register/update an user with no name.");
    user.senha ? user.senha : res.status(400).send("It's not possible to register/update an user with no password.");

    const updatedUser = updateUser(req, req.params.id);
    res.json(updatedUser);
})

module.exports = {
    router
}