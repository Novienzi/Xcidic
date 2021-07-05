require('dotenv').config()
const express = require('express')
const readdirp = require('readdirp')
const app = express()
const cors = require('cors')

// const corsOptionsDelegate = function (req, callback) {
//     let corsOptions;
//     if (["http://localhost:3000", "https://kick-in.herokuapp.com"].indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true }
//     } else {
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }
const corsOptions = {
    origin: "*",
    allowedHeaders: "*",
    optionsSuccessStatus: 200,
    method: "GET,HEAD ,PUT, PATCH, POST, DELETE, OPTIONS"
}

app.use(cors(corsOptions))
app.use(express.json())

readdirp('.', { fileFilter: "*Route.js" })
    .on('data', (entry) => {
        const path = `./${entry.path}`
        const route = require(path)
        app.use(route)
        console.log(`${path} is loaded`);
    })

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is listening on ${process.env.HOSTNAME}`);
})