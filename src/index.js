const sdk = require('axway-flow-sdk');
const xmlToJson = require('./xmlToJson');

function getFlowNodes() {
	const flownodes = sdk.init(module);

	// The unique name of your flow-node.  You can define multiple flow-nodes in this
	// file, but one is typical.
	flownodes.add('xml-node', {
		name: 'XML Flow Node',
		// file support for: svg, png, gif, bmp, jpg, and tiff
		icon: 'icon.svg',
		description: 'Provides support to handle XML-Payload'
	})
		// Add a method to your flow-node.
		.method('xml2json', {
			name: 'XML to JSON',
			description: 'Converts XML payload into JSON data'
		})
		// Add parameter(s) to your method.
		.parameter('xmlData', {
			description: 'XML-Data to be converted',
			type: 'string'
		}, true)
		.parameter('asString', {
			description: 'Convert XML into a String, otherwise it will becomes a JS-Object',
			type: 'boolean'
		}, false)
		// Once all parameters for the method are defined, add output(s) to your method.
		.output('next', {
			name: 'Next',
			description: 'JSON data created',
			context: '$.jsonData',
			schema: {
				type: 'string'
			}
		})
		// Provide the actual javascript implementation.
		.action(xmlToJson);

	return Promise.resolve(flownodes);
}

exports = module.exports = getFlowNodes;
