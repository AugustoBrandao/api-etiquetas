// Função de validação do ticket
export default function tagValidation(name, status, source, price) {
    const nameValidation = (name != null && name.length >= 3);
    const statusValidation = (status != null && status >= 1 && status <= 5);
    const sourceValidation = (source != null && source > 1);
    const priceValidation = (price != null && price > 0);

    if (!nameValidation) {
        throw new Error('Campo "name" está incorreto. Deve ter pelo menos 3 caracteres.');
    } else if (!statusValidation) {
        throw new Error('Campo "status" está incorreto. Deve ser um número entre 1 e 5.');
    } else if (!sourceValidation) {
        throw new Error('Campo "source" está incorreto. Deve ser um número maior que 1.');
    } else if (!priceValidation) {
        throw new Error('Campo "price" está incorreto. Deve ser um número positivo.');
    }

    return true;
}