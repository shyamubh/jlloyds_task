module.exports = {
    controllers: "controllers",
    mongodb: {
        url: "mongodb://127.0.0.1:27017/jlloyds"
    },
    setDefaultHeaders: function(req, res) {
        res.setHeader("Content-Type", "application/json");
    }
};