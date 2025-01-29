import express from 'express';
import path from 'path';

import readExcelFile from './utils/readExcelFile.js';
import saveToJsonFile from './utils/saveToJsonFile.js';
import tagValidation from './utils/tagValidation.js';
import generateTag from './utils/generateTag.js';

const app = express(); 
app.use(express.json());

const filePath = path.resolve("lista_etiquetas.xlsx");  // Encontrar caminho absoluto do arquivo Excel

let tags = [];

// Função assíncrona para carregar dados
async function loadData() {
    try {
        const data = await readExcelFile(filePath); // Lê e formata a planilha
        tags = await saveToJsonFile(data); // Salvar os dados formatados em formato JSON e capturar 
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// Inicializa os dados ao iniciar o servidor
loadData();


// Visualizar todas etiquetas
app.get('/etiquetas', (req, res) => {
    try {
        res.status(200).json(tags);
    } catch (error){
        console.error("Erro ao ler as etiquetas:", error);
        res.status(500).json({ error: "Erro ao processar as etiquetas." }); //Erro do "servidor" 
    }
})

// Visualizar etiqueta por Tag
app.get('/etiquetas/:tag', (req, res) => {
    try {
        const { tag } = req.params;
        
        // Busca o ticket correspondente
        const ticket = tags.find(ticket => ticket.Tag === tag);
        
        if (!ticket) {
            return res.status(404).json({ error: "Etiqueta não encontrada." });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error("Erro ao buscar a etiqueta:", error);
        res.status(500).json({ error: "Erro ao processar a busca da etiqueta." });
    }
})

// Postar uma nova etiqueta
app.post('/etiquetas', (req, res) => {
    try {
        const { name, status, source, price } = req.body;
        const ticketTag = generateTag();

        tagValidation(name, status, source, price);

        const ticket = {
            Tag: ticketTag,
            name: name,
            status: status,
            source: source,
            price: price
          }

        tags.push(ticket);
        saveToJsonFile(tags);

        res.status(201).json(ticket);
    } catch (error) {
        console.error("Erro ao criar nova etiqueta:", error);
        res.status(400).json({ error: error.message });    }
});

// Editar ticket
app.put('/etiquetas/:tag', (req, res) => {
    try {
        const { tag } = req.params;
        const { name, status, source, price } = req.body;

        // Verifica se o ticket existe
        const ticketIndex = tags.findIndex(ticket => ticket.Tag === tag);
        if (ticketIndex === -1) {
            return res.status(404).json({ error: "Ticket não encontrado." });
        }

        tagValidation(name, status, source, price);

        // Atualiza os dados do ticket
        const updatedTicket = {
            Tag: tags[ticketIndex].Tag, // Mantém os dados antigos do ticket
            name: name, // Atualiza caso tenha novo valor, senão mantém o antigo
            status: status,
            source: source,
            price: price,
        };

        // Substitui o ticket antigo com o ticket atualizado
        tags[ticketIndex] = updatedTicket;

        // Salva os dados atualizados no arquivo JSON
        saveToJsonFile(tags);

        // Retorna o ticket atualizado
        res.status(200).json(updatedTicket);
    } catch (error) {
        console.error("Erro ao editar o ticket:", error);
        res.status(500).json({ error: "Erro ao processar a edição do ticket." });
    }
});

// Deletar tiket a partir de sua Tag
app.delete('/etiquetas/:tag', (req, res) => {
    try {
        const { tag } = req.params;

        // Verifica se o registro existe
        const recordIndex = tags.findIndex(ticket => ticket.Tag === tag);
        if (recordIndex === -1) {
            console.log(tags);
            return res.status(404).json({ error: "Etiqueta não encontrado." });
        }

        // Remove o registro da lista
        const updatedData = tags.filter(ticket => ticket.Tag !== tag); 

        // Atualiza a variável tags para refletir a exclusão
        tags.length = 0; // Limpa o array original
        tags.push(...updatedData); // Adiciona os itens restantes

        saveToJsonFile(tags);

        res.status(200).json({ message: "Etiqueta deletada com sucesso." });
    } catch {
        console.error("Erro ao deletar a etiqueta:", error);
        res.status(500).json({ error: "Erro ao processar a exclusão." });
    }
})


//Usar a porta 3000
app.listen(3000, () => { console.log('Servidor rodando na porta 3000') });