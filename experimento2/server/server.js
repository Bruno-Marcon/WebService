const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text({ type: 'text/xml' }));

function calcularMDC(a, b) {
    if (!b) {
        return a;
    }
    return calcularMDC(b, a % b);
}

app.get('/mdc', (req, res) => {
    const wsdlContent = fs.readFileSync('mdc.wsdl', 'utf8');
    
    res.set('Content-Type', 'application/xml');
    
    res.send(wsdlContent);
});

app.post('/mdc', (req, res) => {
    console.log('SOAP Body:', req.body);

    const matchX = req.body.match(/<x>(\d+)<\/x>/);
    const matchY = req.body.match(/<y>(\d+)<\/y>/);
    
    console.log('MatchX:', matchX);
    console.log('MatchY:', matchY);

    if (matchX && matchY) {
        const x = parseInt(matchX[1]);
        const y = parseInt(matchY[1]);

        console.log('Valor de x:', x);
        console.log('Valor de y:', y);

        if (isNaN(x) || isNaN(y)) {
            return res.status(400).send('Valores de x ou y não são números válidos.');
        }

        const mdc = calcularMDC(x, y);

        console.log('MDC calculado:', mdc);

        if (isNaN(mdc)) {
            return res.status(500).send('Erro ao calcular o MDC.');
        }

        const soapResponse = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mdc="http://localhost:3000/mdc">
                <soapenv:Header/>
                <soapenv:Body>
                    <mdc:CalculateMDCResponse>
                        <MDC>${mdc}</MDC>
                    </mdc:CalculateMDCResponse>
                </soapenv:Body>
            </soapenv:Envelope>
        `;
        
        res.set('Content-Type', 'text/xml');
        
        return res.send(soapResponse);
    } else {
        return res.status(400).send('Valores de x ou y não encontrados no corpo da solicitação SOAP.');
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor WSDL rodando em http://localhost:${port}/mdc`);
});
