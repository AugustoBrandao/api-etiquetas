// Função responsável por gerar uma tag aleatória
export default function generateTag() {
    const prefix = "A";
    const suffix = "BR";
    const length = 9; // Total de caracteres entre o prefixo e sufixo
    
    let middle = "";
    const chars = "123456789";
    
    for (let i = 0; i < length; i++) {
        middle += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + middle + suffix;
}