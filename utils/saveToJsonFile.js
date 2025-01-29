import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.join(__dirname, '../data.json'); // Caminho do arquivo JSON

// Função para salvar um array de objetos no arquivo JSON
export default function saveToJsonFile(data) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Arquivo JSON salvo com sucesso!');

    return data; // Retorno como array de objetos para manipulação de dados em memória
}