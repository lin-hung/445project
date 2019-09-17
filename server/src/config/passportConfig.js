import Passport from "passport"
import {JwtStrategy, ExtractJwt} from "passport-jwt"
import GoogleStrategy from "passport-google-oauth20"
import Mongoose from "mongoose"

const User=Mongoose.model("users")

Passport.serializeUser((user,done)=>
    done(err,user.id)
)
Passport.deserializeUser((userID,done)=>
    console.log(userID)
)   

module.exports=Passport=>{
    console.log()
}