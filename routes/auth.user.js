const { signin, signup } = require("../controllers/auth.controller")

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", signup);
    app.post("/ecomm/api/v1/auth/signin", signin);
}