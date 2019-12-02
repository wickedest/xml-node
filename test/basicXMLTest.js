const nodeModule = require('../src')();
const action = require('../src/xmlToJson');
const expect = require('chai').expect;
const { mocknode, validate } = require('axway-flow-sdk');

var xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'	<title>Happy</title>' +
'	<todo>Work</todo>' +
'	<todo>Play</todo>' +
'</note>';

describe('api-builder-plugin-fn-xml-node', () => {
	let flownodes;
	before(() => {
		return nodeModule.then(resolvedSpecs => {
			flownodes = resolvedSpecs;
		});
	});

	describe('#constructor', () => {
		it('Should define flownodes', () => {
			expect(flownodes).to.exist;
			expect(typeof action).to.equal('function');
			expect(mocknode('xml-node')).to.exist;
		});

		it('Should define valid flownodes', () => {
			expect(validate(flownodes)).to.not.throw;
		});
	});

	describe('#xml2json Tests', () => {
		it('Should fail to with invalid argument', () => {
			return mocknode(flownodes).node('xml-node').invoke('xml2json', { xmlData: undefined })
				.then((data) => {
					expect(data).to.deep.equal([ 'invalid argument' ]);
				});
		});

		it('Test convert into an JS Object', () => {
			return mocknode(flownodes).node('xml-node').invoke('xml2json', { xmlData: xml, 'asString': false })
				.then((data) => {
					var result = data.next[1];
					expect(typeof result).to.equal('object');
					expect(result).to.deep.equal({"note":{"title":"Happy","todo":["Work","Play"]}});
				});
		});

		it('Test convert into an JSON String', () => {
			return mocknode(flownodes).node('xml-node').invoke('xml2json', { xmlData: xml, 'asString': true })
				.then((data) => {
					var result = data.next[1];
					expect(typeof result).to.equal('string');
					expect(result).to.deep.equal('{"note":{"title":"Happy","todo":["Work","Play"]}}');
				});
		});
	});
});
