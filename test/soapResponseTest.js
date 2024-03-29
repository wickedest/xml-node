const nodeModule = require('../src')();
const action = require('../src/xmlToJson');
const expect = require('chai').expect;
const { mocknode, validate } = require('axway-flow-sdk');

var xml =
'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
'   <soap:Body>' +
'      <GetQuoteResponse xmlns="http://ws.cdyne.com/">' +
'         <GetQuoteResult>' +
'            <StockSymbol>AAPL</StockSymbol>' +
'            <LastTradeAmount>0</LastTradeAmount>' +
'            <LastTradeDateTime>0001-01-01T00:00:00</LastTradeDateTime>' +
'            <StockChange>0</StockChange>' +
'            <OpenAmount>0</OpenAmount>' +
'            <DayHigh>0</DayHigh>' +
'            <DayLow>0</DayLow>' +
'            <StockVolume>0</StockVolume>' +
'            <PrevCls>0</PrevCls>' +
'            <EarnPerShare>0</EarnPerShare>' +
'            <PE>0</PE>' +
'            <QuoteError>true</QuoteError>' +
'         </GetQuoteResult>' +
'      </GetQuoteResponse>' +
'   </soap:Body>' +
'</soap:Envelope>';

describe('SOAP Message response tests', () => {
	let flownodes;
	before(() => {
		return nodeModule.then(resolvedSpecs => {
			flownodes = resolvedSpecs;
		});
	});

	describe('#xml2json Tests', () => {
		it('[SOAP-XML to JS-Object] Test convert SOAP-XML message into a JS Object', () => {
			return mocknode(flownodes).node('xml-node').invoke('xml2json', { xmlData: xml, 'asString': false })
				.then((data) => {
					var result = data.next[1];
					expect(typeof result).to.equal('object');
					expect(typeof result["soap:Envelope"]["soap:Body"].GetQuoteResponse).to.equal('object');
					var quoteResult = result["soap:Envelope"]["soap:Body"].GetQuoteResponse.GetQuoteResult;
					expect(quoteResult.StockSymbol).to.equal('AAPL');
					expect(quoteResult.LastTradeAmount).to.equal('0');
					expect(quoteResult.QuoteError).to.equal('true');
				});
		});

		it('[SOAP-XML to String] Test convert  message into a JSON String', () => {
			return mocknode(flownodes).node('xml-node').invoke('xml2json', { xmlData: xml, 'asString': true })
				.then((data) => {
					var result = data.next[1];
					expect(typeof result).to.equal('string');
					expect(result).to.include('"StockSymbol":"AAPL"');
					expect(result).to.include('"LastTradeAmount":"0"');
					expect(result).to.include('"QuoteError":"true"');
				});
		});
	});
});
