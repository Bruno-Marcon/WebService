const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text({ type: 'text/xml' }));

app.get('/mdc', (req, res) => {
    const wsdlContent = fs.readFileSync('mdc.wsdl', 'utf8');
    
    res.set('Content-Type', 'application/xml');
    
    res.send(wsdlContent);
});

app.post('/mdc', (req, res) => {
    console.log('SOAP Body:', req.body);
    
    const soapResponse = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mdc="http://localhost:3000/mdc">
            <soapenv:Header/>
            <soapenv:Body>
                <mdc:CalculateMDCResponse>
                    <MDC>10</MDC>
                </mdc:CalculateMDCResponse>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
    
    res.set('Content-Type', 'text/xml');
    
    res.send(soapResponse);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor WSDL rodando em http://localhost:${port}/mdc`);
});
