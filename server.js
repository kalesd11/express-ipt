const app = require("./app");

const port = process.env.PORT;


app.listen(port, (err) => {
    console.log(`App running on port ${port}`)
});
