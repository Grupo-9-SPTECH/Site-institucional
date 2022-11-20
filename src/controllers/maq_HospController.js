var maq_HospModel = require("../models/maq_HospModel");

var sessoes = [];

function confirma(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var ala_Hospitalar = req.body.alaServer;
    
    // Faça as validações dos valores
    if (ala_Hospitalar == undefined) {
        res.status(400).send("Ala Hospitalar não definida pelo usuário");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maq_HospModel.confirma(ala_Hospitalar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function remove(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idMaquina = req.body.idMaquina;


    // Faça as validações dos valores
    if (ala = null) {
        res.status(400).send("Ala Hospitalar não definida pelo usuário");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maq_HospModel.remove(idMaquina)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao remover o cadastro o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    confirma,
    remove
}