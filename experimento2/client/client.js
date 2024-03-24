const axios = require('axios');

const wsdlUrl = 'http://localhost:3000/mdc';

// Dados de entrada para o serviço web
const requestData = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mdc="http://localhost:3000/mdc">
        <soapenv:Header/>
        <soapenv:Body>
            <mdc:CalculateMDCRequest>
                <x>1920</x>
                <y>1080</y>
            </mdc:CalculateMDCRequest>
        </soapenv:Body>
    </soapenv:Envelope>
`;

const axiosConfig = {
    headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://localhost:3000/mdc'
    }
};

axios.post(wsdlUrl, requestData, axiosConfig)
    .then(response => {
        const mdc = parseInt(response.data.match(/<MDC>(\d+)<\/MDC>/)[1]);
        
        const x = 1920;
        const y = 1080;

        const aspectRatioX = x / mdc;
        const aspectRatioY = y / mdc;

        console.log('MDC:', mdc);
        console.log('Aspect Ratio X:', aspectRatioX);
        console.log('Aspect Ratio Y:', aspectRatioY);
    })
    .catch(error => {
        console.error('Erro ao chamar o serviço:', error);
    });
