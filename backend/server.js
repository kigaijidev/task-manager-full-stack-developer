
const app = require("./src/app");
const port = process.env.DEV_APP_PORT;


const server = app.listen( port , () => {
    console.log(`WSV eCommerce start with port::${port}`)
})

// process.on('SIGINT', () => {
//     server.close( () => console.log(`Exit Server Express`));
// })