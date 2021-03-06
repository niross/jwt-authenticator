"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.








checkStatus=checkStatus;exports.













parseJSON=parseJSON; /**
 * Helper functions to be used when making requests to the backend.
 */ /**
 * Check the response status and raise an error if it's no good.
 * @param {object} response - the http response object as provided by fetch
 * @returns {object} - the http rsponse object or throws an error
 */function checkStatus(response){if(response.status>=200&&response.status<300){return response;}var error=new Error(response.statusText);error.response=response;throw error;} /**
 * Return an object given an http json response
 * @param {object} response - json encoded response object as provided by fetch
 * @returns {object} - The parsed json
 */function parseJSON(response){return response.json();}