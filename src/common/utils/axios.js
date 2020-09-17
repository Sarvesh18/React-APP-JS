/* eslint-disable */ 
'use strict';
const axios = require('axios');

console.log('process.env.BASE_URL', process.env.BASE_URL);

axios.defaults.baseURL = process.env.BASE_URL || 'https://api.spaceXdata.com/v3'; 

//
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

//
axios.interceptors.response.use((response) => {
    return response;   
}, (error) => {
    return Promise.reject(error);
})

//axios.interceptors.request.eject('');


/*transformRequest: [
    (data, headers) => {
        return data;
    }
],*/

/*transformResponse: [
    (data) => {
        return data;
    }
],*/

const api = (method, url, data, contentType = 'JSON') => {
    let options = [];
    //options['timeout'] = 0;

    options['url'] = url;
    options['method'] = method;
    options.validateStatus = validateStatus;
    options.headers = {
        'content-type': getContentType(contentType), 
        //'content-type': data instanceof FormData ? getContentType('form-data') : getContentType('JSON')
    };
    options['data'] = data;
    
    /*if(method === 'GET') {
        options['params'] = dataSerializer(contentType, data);
    }
    else {
        options['data'] = dataSerializer(contentType, data);
    }*/

    return axios(options)
        .then(responseHandler)
        .catch(errorHandler);   
}


const setAuthorization = (token) => {
    //Async Storage Set Token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


const getContentType = (type) => {
    switch(type) {
        case 'form-data':
            return 'multipart/form-data';
        case 'urlencoded':
            return 'application/x-www-form-urlencoded';
        //case 'html':
            //return 'text/html';
        //case 'plain':
            //return 'text/plain';
        default:
            return 'application/json';
    }
};


const validateStatus = (status) => {
    return status >=200 && status <300;
}


const dataSerializer = (contentType, data) => {
    switch(contentType) {
        case 'application/x-www-form-urlencoded': 
            return data;
        case 'query':
            /*
            const params = new URLSearchParams();
            params.append('key', 'value');
            //or
            const params = require('qs').stringify({'key': 'value'});
            return data;
            */
            return data;
        case 'form-data': 
            /*
            const FormData = require('form-data');
            const formData = new FormData();
            formData.append('key', 'value');
            or
            headers: formData.getHeaders()
            if (config.data instanceof FormData) {
                Object.assign(config.headers, config.data.getHeaders());
            }
            */
            return data;
        //JSON
        default: 
            return data;
    }
}


/*
    response.data;
    response.status;
    response.statusText;//OK

    response.headers;
    response.config;
    response.request;
*/
const responseHandler = (response) => {

    //if(response.headers.Authorization) {
        //setAuthorization(token);
    //}

    console.log('===>response', response);
    return response.data;
}


const errorHandler = (error) => {

    //     error: {
    //         statusCode: 500,
    //         name: 'Error',
    //         message: '',
    //         code: '',
    //         errno: '',
    //         syscall: '',
    //         stack: ''
    //     }

    console.log('error.config', error.config);

    if(error.response) {
        //error.response.status === 401
        //dispatch() - logout
        //setAAuth(null);

        console.log('error.response', error.response);
        throw new Error(error.response.data ? error.response.data : '');
    }    
    else if(error.request) {
        //TODO:
        console.log('error.request', error.request);
        throw new Error(JSON.stringify(error.request));
    }
    else {

        console.log('error.message', error.message); 
        throw new Error(error.message);
    }
}



export default api;
