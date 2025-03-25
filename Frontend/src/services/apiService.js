import { getApiBaseUrl } from "../config";

const makeApiCall = async (url, method, body = null, headers = {}) => {
    const response = await fetch(getApiBaseUrl() + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

export const callApi = async (url, method, body = null) => {
    return makeApiCall(url, method, body);
}

export const callApiWithAuth = async (url, method, body = null) => {
    const token = localStorage.getItem('token');
    return makeApiCall(url, method, body, {
        'Authorization': `Bearer ${token}`
    });
}