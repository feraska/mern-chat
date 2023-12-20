import { userModel } from "../model/userModel.js"
import bcrypt from "bcrypt"
export const register = async(req,res,next) => {

    try{
        const {username, email, password} = req.body
    const userCheck = await userModel.findOne({username})
    if(userCheck) {
        return res.json({msg:"user name already used",status:false})
    }
    const emailCheck = await userModel.findOne({email})
    if(emailCheck) {
        return res.json({msg:"email already used",status:false})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await userModel.create({
        email,
        username,
        password:hashedPassword
    })
    delete user.password
    return res.json({status:true,user})
    } catch(ex){
        next(ex)
    }
}

export const login = async(req,res,next) => {

    try{
        const {username, password} = req.body
        const user = await userModel.findOne({username})
    if(!user) {
        return res.json({msg:"user name is incorrect",status:false})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) {
        return res.json({msg:"password is incorrect",status:false})
    }
    delete user.password
    return res.json({status:true,user})
    } catch(ex){
        next(ex)
    }
}
export const setAvatar = async(req,res,next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
    } catch(ex) {
        next(ex)
    }
}
export const getAllUsers = async(req,res,next) => {
    try {
        const users = await userModel.find({
            _id:{$ne:req.params.id}
        }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    } catch(ex) {
        next(ex)
    }
}