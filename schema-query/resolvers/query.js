const { usuarios, perfis } = require("../data/db")

module.exports = {
    ola() {
        return 'Bom dia'
    },
    horaAtual() {
        return `${new Date}`
    },
    usuarioLogado() {
        return {
            id: 1,
            nome: "Ana da Web",
            email: "anda@email.com",
            idade: 35,
            salario_real: 17100.00,
            vip: true
        }
    },
    precoEmDestaque() {
        return {
            nome: "Revista",
            preco: 10.00,
            desconto: 0.015
        }
    },
    numerosMegaSena() {
        //return [4, 8, 13, 25, 52, 58]
        const cresente = (a, b) => a - b

        return Array(6).fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(cresente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, args) {
        const selecionados = usuarios
            .filter(u => u.id === args.id)

        return selecionados ? selecionados[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, args) {
        const selecionado = perfis
            .filter(u => u.id === args.id)
        
        return selecionado ? selecionado[0] : null
    }
}