# API-Builder XML-Flow node

Use this extension to add an XML-Flow node to your API-Builder project. With that you can convert XML-Payload you may have received from a backend stream into Javascript Object for further processing or directly into a JSON-String. That allows you to easily merge data from different sources and formats into a JSON-Based-REST-API. 

## Convert XML to JSON
After have installed the XML-Node into your API-Builder project, Drag & Drop the XML-Node into your flow and select the method: XML to JSON. You get the following configuration options:  
![XML Node Settings](https://github.com/Axway-API-Builder-Ext/xml-node/blob/master/misc/images/xml-flow-node-settings.png)  
Provide the XML data should be converted into JSON using either a Selector or a plain XML-String.
Secondly you can decide if you would like to have a Javascript Object or the JSON-Payload as String.

## Convert JSON to XML
> This is not yet supported!


## Install
After creating your API Builder service (`api-builder init`), you can install this plugin using npm:

```
npm install --no-optional @axway-api-builder-ext/api-builder-plugin-fn-xml-node
```
After installation start the API-Builder project and you get the following node:
![XML Node](https://github.com/Axway-API-Builder-Ext/xml-node/blob/master/misc/images/xml-flow-node.png)
