const moment = require('moment')
const { gerarLog } = require('./log')

module.exports = {

  /**
     * Verificar se uma variavel está vazia. Testa undefined, Array vazio, String em brancos e Objetc vazio. Retorna "true" se vazio.
     * * Pode ser passado qualquer tipo de variavel.
     */
  estaVazio: (valor) => {
    return ((valor === undefined) ||
      (Array.isArray(valor) && valor.length === 0) ||
      (typeof valor === 'string' && !valor.trim()) ||
      (typeof valor === 'object' && Object.keys(valor).length === 0))
  },

  // Retornar a data e hora atual
  dataHoraAtual: () => {
    return moment()
  },

  // Retornar a data e hora atual formatada padrão americano.
  dataHoraAtualFormatada: () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  },

  /**
     * Converte a data padrão brasil dd/mm/aaaa para americano aaaa-mm-dd.
     * * Informe a data no padrão brasileiro.
     */
  converteData: (data) => {
    if (!data) return data

    data.slice(0, 10)
    if (data.includes('/'))
      data = data.split('/').reverse().join('-')

    return data
  },

  /**
     * Formatar retorno de Erro.
     * * Informar no primeiro parâmetro o objeto com erro, ou então pode ser passado no segundo uma mensagem padrão
     */
  trataErro: (erro, msg) => {

    if (module.exports.estaVazio(msg)) {
      msg = 'Erro:'
    }

    let erroMensagem = msg
    erroMensagem += ` - ${erro?.message || erro || "Erro não tratado!"}`

    gerarLog.error(erroMensagem, { stack: erro?.stack })

    if (process.env.DEBUG === 'S') {
      console.log(moment().format('YYYY-MM-DD HH:mm:ss') + ' : ' + erroMensagem)
      console.log(erroMensagem)
      console.trace()
    }
    return erroMensagem
  }

}
