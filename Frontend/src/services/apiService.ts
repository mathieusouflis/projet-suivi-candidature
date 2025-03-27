import { getApiBaseUrl } from "@/config/index.ts";

interface Body {
    [key: string]: any;
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';


const makeApiCall = async (url: string, method: string, body: Body | null = null, headers = {}) => {
    const response = await fetch(getApiBaseUrl() + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        return {
            success: true,
            data: await response.json()
        }
    }else {
        return {
            success: false,
            error: await response.json()
        }
    }

}

export const callApi = async (url: string, method: Method, body: Body | null = null) => {
    return makeApiCall(url, method, body);
}

export const callApiWithAuth = async (url: string, method: Method, body: Body | null = null) => {
    const token = localStorage.getItem('token');
    return makeApiCall(url, method, body, {
        'Authorization': `Bearer ${token}`
    });
}