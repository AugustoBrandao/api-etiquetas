import XLSX from 'xlsx';

// Função responsável por ler o arquivo excel e retornar as linhas como objetos
export default function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Seleciona a primeira aba
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Transformando os dados no formato desejado
    const transformedData = data.map(row => ({
        Tag: row["Customer"],          // A chave "Customer" vai para "Tag"
        name: row["MaisEnvios Testes"], // A chave "MaisEnvios Testes" vai para "name"
        status: row["__EMPTY"],        // A chave "__EMPTY" vai para "status"
        source: row["__EMPTY_1"],      // A chave "__EMPTY_1" vai para "source"
        price: row["__EMPTY_2"],       // A chave "__EMPTY_2" vai para "price"
    }));

    return transformedData.slice(1); // Retorna os dados transformados do segundo item em diante
}