const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const user=mongoose.model("users",userschema)

exports.registerUser=async(req,res)=>
{
    const {name,email,password}=req.body
    try {
        const alreadyuser=await user.findOne({email})
        if(alreadyuser)
        {
            res.status(406).json('User already exist')
        }
        else
        {
            const newuser=new user({
                name,
                email,
                password
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(500).json(`Request failed due to ${error}`)
    }
}

exports.userlogin=async(req,res)=>
{
    const{email,password}=req.body
    try {
       const alreadyuser=await user.findOne({email,password})

       if(alreadyuser){
        const token=jwt.sign({userid:alreadyuser._id},"krishnasecretkey")
        res.status(200).json({alreadyuser,token})
       } 
       else
       {
        res.status(404).json('Invalid email or password')
       }
    } catch (error) {
        res.status(500).json(`Request failed due to ${error}`)
    }
}

exports.protected = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json('Token not provided');
    }
    try {
        const jwtresponse = jwt.verify(token, 'krishnasecretkey');
        const users = await user.findById(jwtresponse.userid);
        if (!users) {
            return res.status(404).json('User not found');
        }
        req.payload = users; 
        next(); 
    } catch (error) {
        return res.status(500).json('Invalid token');
    }
};


exports.updateuser = async (req, res) => {
    const { _id } = req.payload;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await user.findByIdAndUpdate(
            _id,
            { name, email, password },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(`Update failed: ${error}`);
    }
};

exports.deleteuser=async(req,res)=>
{
    const {id}=req.params
    try {
        const removeuser=await user.findByIdAndDelete({_id:id})
        res.status(200).json(removeuser)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

exports.getusers=async(req,res)=>
{
    try {
        const getuser=await user.find()
        res.status(200).json(getuser)  
    } catch (error) {
        res.status(500).json('failed to fetch')
    }

}