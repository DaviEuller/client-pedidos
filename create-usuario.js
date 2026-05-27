const prisma = require("./src/data/prisma.js");

async function criarUsuario() {
    try {
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: "João Silva",
                senha: "senha123",
                email: "joao@example.com",
                idade: 28
            }
        });
        console.log("✅ Usuário criado com sucesso:", novoUsuario);
    } catch (erro) {
        if (erro.code === 'P2002') {
            console.error("❌ Email já existe no banco de dados");
        } else {
            console.error("❌ Erro ao criar usuário:", erro.message);
        }
    } finally {
        await prisma.$disconnect();
    }
}

criarUsuario();
