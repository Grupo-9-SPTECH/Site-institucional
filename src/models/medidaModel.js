var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        ${idMaquina}, fkMaquina, percent_Memoria_Em_Uso, uso_Cpu_Processo, uso_Processador,
        uso_Ram_Processo, percent_Uso_Disco from
        [dbo].[medida] join [dbo].[maquina] on
        [dbo].[medida].fkMaquina = ${idMaquina}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top ${limite_linhas}
        ${idMaquina}, fkMaquina, percent_Memoria_Em_Uso, uso_Cpu_Processo, uso_Processador,
        uso_Ram_Processo, percent_Uso_Disco from
        [dbo].[medida] join [dbo].[maquina] on
        [dbo].[medida].fkMaquina = ${idMaquina}`;

    } else { 
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {

    instrucaoSql = ''

if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        ${idMaquina}, fkMaquina, percent_Memoria_Em_Uso, uso_Cpu_Processo, uso_Processador,
        uso_Ram_Processo, percent_Uso_Disco from
        [dbo].[medida] join [dbo].[maquina] on
        [dbo].[medida].fkMaquina = ${idMaquina}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top ${limite_linhas}
        ${idMaquina}, fkMaquina, percent_Memoria_Em_Uso, uso_Cpu_Processo, uso_Processador,
        uso_Ram_Processo, percent_Uso_Disco from
        [dbo].[medida] join [dbo].[maquina] on
        [dbo].[medida].fkMaquina = ${idMaquina}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
