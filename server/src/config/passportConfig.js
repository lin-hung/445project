import Passport from "passport"
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
    Passport.use(new GoogleStrategy({
        clientID: process.env.googleClientId,
        clientSecret: process.env.googleClientSecret,
        callbackURL: "api/auth/googlecallback"
      },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ googleID: profile.id }).then((u) => {
            if (u) {
              return done(null, u);
            }
            else {
              new User({
                name: profile.name.givenName + " " + profile.name.familyName,
                email: profile.emails[0].value,
                googleId: profile.id,
               // avatar: profile._json.image.url.replace("?sz=50", "")
              }).save().then((u) => {
                console.log("new user created " + newUser);
                return done(null, u);
              });
            }
          })
        }
      ))
}