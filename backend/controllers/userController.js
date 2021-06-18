import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//@desc auth user and get token
//route  GET  /api/users/login
//access public

const authUser = asyncHandler(async(req,res)=>{
   const {email, password } = req.body;

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
   }
   else{
       res.status(401)
       throw new Error('Invalid email or password')
   }

})

//@desc register user 
//route  GET  /api/users/register
//access public

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email, password } = req.body;
 
    const userExist = await User.findOne({email})
 
    if(userExist){
        res.status(400)
        throw new Error("user already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }

 
 })

//@desc Get user profile
//route  GET  /api/users/profile
//access public

const getUserProfile = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.user._id)
    
    

    if(user){
       
      return  res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error("user not found")
    }
    
 })


 //@desc update user profile
//route  PUT  /api/users/profile
//access private

const updateUserProfile = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.user._id)
    let glass = req.body.password;
    if(user){
        
        
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(glass !==""){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error("user not found")
    }
    
 })

 const getUsers = asyncHandler(async(req,res)=>{
   
    const users = await User.find({})

    res.json(users)
    
    

    
 })



 const deleteUser = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json({message:  "User Deleted"})
    }
    else{
        res.status(404)
        throw new Error("user not found")
    }

    

    
 })
 
 const getUserById = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.params.id).select("-password")
    
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error("user not found")
    }
 })

 const updateUser = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.params.id)
 
    if(user){
        
        
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        
        })
    }
    else{
        res.status(404)
        throw new Error("user not found")
    }
    
 })

export {authUser, getUserProfile, registerUser,updateUserProfile,getUsers,deleteUser, getUserById,updateUser}