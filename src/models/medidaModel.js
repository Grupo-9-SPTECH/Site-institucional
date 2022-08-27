var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;

    // } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    //     instrucaoSql = `select 
    //     chave as chave,
    //                     momento,
    //                     DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
    //                 from medida
    //                 where fk_aquario = ${idAquario}
    //                 order by id desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = 
//         `select votacao.nomeJogador as jogador, count(fkjogador) as contagem from usuario join votacao on fkjogador = idvotacao
// group by nomeJogador order by nomeJogador;`;
`select jogador.nomeJogador as jogador, count(fkjogador) as contagem from usuario join jogador on usuario.fkjogador = jogador.idJogador
group by nomeJogador order by nomeJogador;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {  
        instrucaoSql = `
        select jogador, count(jogador) as chave from usuario  ${idAquario}
    group by jogador;`
                    ;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select sum(chave) as chave, DATE_FORMAT(date_add(momento, INTERVAL second(momento) * -1 SECOND),'%H:%i:%s') 
        as momento_grafico from medida where fk_aquario = ${idAquario} 
        group by date_add(momento, INTERVAL second(momento) * -1 SECOND)
        order by id desc limit 1;`;
        
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