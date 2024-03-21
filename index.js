require('dotenv').config()

const express=require('express')

const cors=require('cors')

const route=require('./router')

require('./dbconnection')

const server=express()

server.use(cors())

server.use(express.json())

server.use(route)

const portnumber = 4000 || process.env.portnumber

server.listen(portnumber,()=>
{
    console.log(`server at port number ${portnumber}`);
})