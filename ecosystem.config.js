module.exports = {
    apps: [{
        name: "dns-server",
        script: "./index.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
};