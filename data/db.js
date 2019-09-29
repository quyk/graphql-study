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
        salario: 200,
        vip: true,
        perfil_id: 1
    },
    {
        id: 2,
        nome: "Ricardo Sales",
        email: "sales@gmail.com",
        idade: 18,
        vip: false,
        perfil_id: 2
    },
    {
        id: 3,
        nome: "Marina Mendonça",
        email: "mmendonca@gmail.com",
        idade: 24,
        salario: 1500,
        vip: true,
        perfil_id: 1
    }
]

module.exports = { usuarios, perfis }