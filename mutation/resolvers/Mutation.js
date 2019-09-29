const { usuarios, proximoId } = require('../data/db')

module.exports = {
    novoUsuario(_, args) {
        // {nome, email, idade}
        const emailExistente = usuarios
            .some(e => e.email === args.email)

        if(emailExistente) {
            throw new Error("E-mail cadastrado")
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: "ATIVO"
        }

        usuarios.push(novo)

        return novo
    },

    excluirUsuario(_, {id}) {
        const i = usuarios
            .findIndex(u => u.id == id)

        if(i >= 0) {
            const excluidos = usuarios.splice(i, 1)
            return excluidos ? excluidos[0] : null
        }

        return null
    }
}