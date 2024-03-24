const axios = require('axios');

// URL do serviço WSDL
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

// Configurações para a chamada SOAP
const axiosConfig = {
    headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://localhost:3000/mdc'
    }
};

// Chamada ao serviço web
axios.post(wsdlUrl, requestData, axiosConfig)
    .then(response => {
        // Extrair MDC da resposta
        const mdc = parseInt(response.data.match(/<MDC>(\d+)<\/MDC>/)[1]);
        
        // Dados de entrada para o cálculo do Aspect Ratio
        const x = 1920;
        const y = 1080;

        // Calcular o Aspect Ratio
        const aspectRatioX = x / mdc;
        const aspectRatioY = y / mdc;

        // Exibir resultados
        console.log('MDC:', mdc);
        console.log('Aspect Ratio X:', aspectRatioX);
        console.log('Aspect Ratio Y:', aspectRatioY);
    })
    .catch(error => {
        console.error('Erro ao chamar o serviço:', error);
    });
