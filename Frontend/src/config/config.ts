const config = {
    api: {
        baseUrl: import.meta.env.API_BASE_URL || "http://localhost:3000",
        timeout: import.meta.env.API_TIMEOUT || 5000,
    },
    frontend: {
        MODE: import.meta.env.MODE || "development",
    }
}

export default config;