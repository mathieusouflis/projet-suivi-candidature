import config from "@/config/config";

export const getApiBaseUrl = (): string => {
    return config.api.baseUrl;
};

export const isProduction = (): boolean => {
    return config.frontend.MODE === "production";
};

export const isDevelopment = (): boolean => {
    return config.frontend.MODE === "development";
};
