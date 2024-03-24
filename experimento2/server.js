const express = require('express');
const fs = require('fs');
const app = express();

// Rota para acessar o arquivo WSDL
app.get('/mdc', (req, res) => {
    // Carregar o conteúdo do arquivo WSDL
    const wsdlContent = fs.readFileSync('mdc.wsdl', 'utf8');
    
    // Definir o tipo de conteúdo da resposta como XML
    res.set('Content-Type', 'application/xml');
    
    // Enviar o conteúdo do arquivo WSDL como resposta
    res.send(wsdlContent);
});

// Iniciar o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor WSDL rodando em http://localhost:${port}/mdc`);
});
