const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const cors = require(cors)

app.use(express.json())
app.use(morgan('dev'))
app.disable('etag');
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())

mongoose.connect(
  process.env.URI,
  () => console.log('Connected to the DB')
)

app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
app.use("/api/post", require('./routes/postRouter.js'))
app.use("/api/comment", require("./routes/commentRouter.js"))
app.use("/api/userImage", require("./routes/userImageRouter"))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})