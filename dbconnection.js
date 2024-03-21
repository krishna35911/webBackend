const mong=require('mongoose')

const conctstring=process.env.mongourl

mong.connect(conctstring).then(()=>
{
    console.log('Connected successfully');
}).catch((err)=>
{
    console.log(`failed due to ${err}`);
})