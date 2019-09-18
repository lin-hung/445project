import Passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import Mongoose from "mongoose"

const User = Mongoose.model("users")

Passport.serializeUser((user, done) =>
  done(null, user.id)
)
Passport.deserializeUser((id,done)=>{
  console.log(`deserialize user: id${id}`)
  User.findById(id,(err,user)=>{
    done(err,user)
  })
})
module.exports = Passport => {
  Passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "api/auth/googlecb"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleID:profile.id}).then((user)=>{
        if(user){
          return done(null,user)
        }
        else{
          new User({
            name: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            googleID: profile.id
          }).save().then((user)=>{
            console.log(`new user created: googleID ${user.googleID} name ${user.name}`)
            return done(null,user)
          })
        }
      })
    }
  )//new googlestrategy
  )//passport.use
}