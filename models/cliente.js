const db = require("./banco");

const Cliente = db.sequelize.define("cliente", {
    nome: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
})

module.exports = Cliente
