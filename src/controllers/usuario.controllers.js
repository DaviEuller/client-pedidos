const prisma = require("../data/prisma.js");


const listar = async (req, res) => {

    const lusta = await prisma.usuario.findMany();

    res.status(200).json(lusta);

}

const cadastrar = async (req, res) =>{
    try {
        const { nome, senha, email, idade } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !senha || !email || !idade) {
            return res.status(400).json({ 
                erro: "Todos os campos são obrigatórios" 
            });
        }

        const item = await prisma.usuario.create({
            data: {
                nome,
                senha,
                email,
                idade
            }
        });

        
        return res.status(201).json(item);
    } catch (erro) {
        if (erro.code === 'P2002') {
            return res.status(400).json({ 
                erro: "Email já cadastrado" 
            });
        }
        console.error("Erro ao cadastrar:", erro);
        return res.status(500).json({ 
            erro: "Erro ao cadastrar usuário" 
        });
    }
}

const atualizar = async (req, res) => {
    const { id } = req.params;
    const { nome, senha, email, idade } = req.body;

    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!usuarioExistente) {
            return res.status(404).json({ 
                erro: "Usuário não encontrado" 
            });
        }   

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nome: nome || usuarioExistente.nome,
                senha: senha || usuarioExistente.senha,
                email: email || usuarioExistente.email,
                idade: idade || usuarioExistente.idade
            }
        }); 

        return res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        if (erro.code === 'P2002') {
            return res.status(400).json({
                erro: "Email já cadastrado por outro usuário"
            });
        }
        console.error("Erro ao atualizar usuário:", erro);
        return res.status(500).json({ 
            erro: "Erro ao atualizar usuário" 
        });
    }

}

    const excluir = async (req, res) => {
        const { id } = req.params;

        try {
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });

            if (!usuarioExistente) {
                return res.status(404).json({ 
                    erro: "Usuário não encontrado" 
                });
            }

            await prisma.usuario.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });

        } catch (erro) {
            console.error("Erro ao excluir usuário:", erro);
            return res.status(500).json({ 
                erro: "Erro ao excluir usuário" 
            });
        }
    }

    const criar_pedido = async (req, res) => {
        const { id } = req.params;
        const { produto, quantidade } = req.body;

        try {
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });

            if (!usuarioExistente) {
                return res.status(404).json({ 
                    erro: "Usuário não encontrado" 
                });
            }
            const novo_pedido = await prisma.pedido.create({
                data: {
                    produto,
                    quantidade,
                    usuarioId: parseInt(id)
                }
            });

            return res.status(201).json(novo_pedido);
        } catch (erro) {
            console.error("Erro ao criar pedido:", erro);
            return res.status(500).json({ 
                erro: "Erro ao criar pedido" 
            });
        }
    }  
    const listar_pedidos = async (req, res) => {
        const { id } = req.params;

        try {
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });

            if (!usuarioExistente) {
                return res.status(404).json({ 
                    erro: "Usuário não encontrado" 
                });
            }

            const pedidos = await prisma.pedido.findMany({
                where: { usuarioId: parseInt(id) }
            });

            return res.status(200).json(pedidos);
        } catch (erro) {
            console.error("Erro ao listar pedidos:", erro);
            return res.status(500).json({ 
                erro: "Erro ao listar pedidos" 
            });
        }
    }
    const excluir_pedido = async (req, res) => {
        const { id } = req.params;

        try {
            const pedidoExistente = await prisma.pedido.findUnique({
                where: { id: parseInt(id) }
            });

            if (!pedidoExistente) {
                return res.status(404).json({ 
                    erro: "Pedido não encontrado" 
                });
            }

            await prisma.pedido.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ mensagem: "Pedido excluído com sucesso" });

        } catch (erro) {
            console.error("Erro ao excluir pedido:", erro);
            return res.status(500).json({ 
                erro: "Erro ao excluir pedido" 
            });
        }
    }

    const atualizar_pedido = async (req, res) => {
        const { id } = req.params;
        const { produto, quantidade } = req.body;

        try {
            const pedidoExistente = await prisma.pedido.findUnique({
                where: { id: parseInt(id) }
            });

            if (!pedidoExistente) {
                return res.status(404).json({ 
                    erro: "Pedido não encontrado" 
                });
            }
            const pedidoAtualizado = await prisma.pedido.update({
                where: { id: parseInt(id) },
                data: {
                    produto: produto || pedidoExistente.produto,
                    quantidade: quantidade || pedidoExistente.quantidade
                }
            });
        
            return res.status(200).json(pedidoAtualizado);
        } catch (erro) {
            console.error("Erro ao atualizar pedido:", erro);
            return res.status(500).json({
                erro: "Erro ao atualizar pedido"
            });
        }
    
module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir,
    criar_pedido,
 