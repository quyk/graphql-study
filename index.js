const { ApolloServer, gql} = require("apollo-server");

const perfis = [
    { id: 1, nome: "Comum"},
    { id: 2, nome: "Administrador" }
];

const usuarios = [
    {
        id: 1,
        nome: "Kaa da Silva",
        email: "kaas@gmail.com",
        idade: 32,
        perfil_id: 1
    },
    {
        id: 2,
        nome: "Ricardo Sales",
        email: "sales@gmail.com",
        idade: 18,
        perfil_id: 2
    },
    {
        id: 3,
        nome: "Marina Mendonça",
        email: "mmendonca@gmail.com",
        idade: 24,
        perfil_id: 1
    }
]

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean,
        perfil: Perfil
    }

    type Perfil {
        id: Int
        nome: String
    }

    # Pontos de entradas da API!    
    type Query {
        ola: String!
        horaAtual: String
        usuarioLogado: Usuario
        precoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`
const resolvers = {
    Usuario : {
        salario(usuario) {
            return usuario.salario_real
        },

        perfil(usuario) {
            const selecionado = perfis
                .filter(p => p.id === usuario.perfil_id)    
            
            return selecionado ? selecionado[0] : null 
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto){
                return produto.preco * (1 - produto.desconto)
            }
            
            return produto.preco
        }
    },

    Query: {
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
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})