const express = require('express');
const router = express.Router();
const bills = require('./boletosF');

const usersList = [
    {
        id: 1,
        name: "Leonardo",
        passwd: "12345678",
    },
    {
        id: 2,
        name: "Rafaelli",
        passwd: "87654321",
    },
];

// Respostas de informação (100-199),
// Respostas de sucesso (200-299),
// Redirecionamentos (300-399),
// Erros do cliente (400-499),
// Erros do servidor (500-599).

const getUsersList = () => {
    return usersList;
};

const getUser = (id) => {
    return getUsersList().find(u => u.id == id);
}

const createUser = (user) => {
    user.id = getUsersList().length + 1;
    getUsersList().push(user);
    return user;
}

const updateUser = (newUser, id) => {
    const user = getUser(id);
    user.name = newUser.body.name;
    user.passwd = newUser.body.passwd;
    return user;
}

const deleteUser = (id) => {
    const index = getUsersList().findIndex(u => u.id == id);
    getUsersList().splice(index, 1);
    return getUsersList();
}

//  ROUTES

router.get('/', (req, res) => {
    const usersList = getUsersList();
    res.json(usersList)
});

router.get('/:id', (req, res) => {
    const getUser = getUser(req.params.id);
    res.json(getUser);
})

router.post('/', (req, res) => {
    const user = req.body;
    user.name && user.passwd ? res.json(createUser(user)) :  res.status(400).send("It's not possible to register/update an user with no name.");
})

router.delete('/:id', (req, res) => {
    const newList = deleteUser(req.params.id);
    res.json(newList);
})

router.put('/:id', (req, res) => {
    const user = req.body;
    user.name ? user.name : res.status(400).send("It's not possible to register/update an user with no name.");
    user.passwd ? user.passwd : res.status(400).send("It's not possible to register/update an user with no password.");

    const updatedUser = updateUser(req, req.params.id);
    res.json(updatedUser);
})

module.exports = {
    router
}