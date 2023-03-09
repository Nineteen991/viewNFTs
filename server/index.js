const express = require('express') 
const Moralis = require('moralis').default
// const { EvmChain } = require("@moralisweb3/common-evm-utils")
const cors = require('cors') 
const bodyParser = require('body-parser') 
require('dotenv').config()

const app = express()
const PORT = 5001
const nftRouter = require('./routes/nftRouter')
const api = process.env.MORALIS_API_KEY

app.use(cors({
  origin: 'http://localhost:3000',
  // credentials: true, 
}))
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.get('/', (req, res) => {
  res.send('howdy')
})

app.use('/balances', nftRouter)

const startServer = async () => {
  await Moralis.start({
    apiKey: api
  })

  app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
  })
}

startServer()