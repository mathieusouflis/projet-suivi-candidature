import config from "./config";

export const getApiBaseUrl = () => {
    return config.api.baseUrl;
}

export const isProduction = () => {
    return config.api.MODE === "production";
}

export const isDevelopment = () => {
    return config.api.MODE === "development";
}