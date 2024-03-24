const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const wsdlUrl = 'http://localhost:3000/mdc';

function fazerChamadaSOAP(x, y) {
  const requestData = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mdc="http://localhost:3000/mdc">
        <soapenv:Header/>
        <soapenv:Body>
            <mdc:CalculateMDCRequest>
                <x>${x}</x>
                <y>${y}</y>
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

      const aspectRatioX = x / mdc;
      const aspectRatioY = y / mdc;

      console.log('MDC:', mdc);
      console.log('Aspect Ratio X:', aspectRatioX);
      console.log('Aspect Ratio Y:', aspectRatioY);

      rl.close();
    })
    .catch(error => {
      console.error('Erro ao chamar o serviço:', error);
      rl.close();
    });
}

rl.question('Digite o valor de x: ', (x) => {
  rl.question('Digite o valor de y: ', (y) => {
    fazerChamadaSOAP(parseInt(x), parseInt(y));
  });
});
