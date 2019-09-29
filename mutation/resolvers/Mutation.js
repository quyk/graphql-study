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
    }
}