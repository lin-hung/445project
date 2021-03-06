import Passport from "passport"
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import GoogleStrategy from "passport-google-oauth20"
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import Mongoose from "mongoose"


const User = Mongoose.model("users")

Passport.serializeUser((user, done) =>
  done(null, user.id)
)

Passport.deserializeUser((id, done) => {
  console.log(`deserialize user: id${id}`)
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secret
}

module.exports = Passport => {
  Passport.use(new JWTStrategy(jwtStrategyOpts, (jwt_payload, done) => {
    User.findById(jwt_payload.user._id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => {
        console.log(err)
        return done(null, false)
      })
  }))



  Passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "api/auth/googlecb"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ providerId: profile.id }).then((user) => {
        if (user) {
          return done(null, user)
        }
        else {
          return done(null, false, { message: 'User does not exist', profile: profile })
        }
      })
    }
  )//new googlestrategy
  )//passport.use

  Passport.use(new LinkedInStrategy({
    clientID: process.env.linkedinClientID,
    clientSecret: process.env.linkedinClientSecret,
    callbackURL: "api/auth/linkedincb",
    response_type: "code",
    profileFields: [
      "formatted-name",
      "headline",
      "id",
      "public-profile-url",
      "email-address",
      "location",
    ],
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
  }, (accessToken, refreshToken, profile, done) => {
    console.log(`in linkedinstrategy ${profile}`)

    User.findOne({ providerId: profile.id }).then((user) => {
      if (user) {
        return done(null, user)
      }
      else {
        return done(null, false, { message: 'User does not exist', profile: profile })
      }
      //   else {
      //     new User({
      //       name: profile.name.givenName + " " + profile.name.familyName,
      //       email: profile.emails[0].value,
      //       linkedinID: profile.id
      //     }).save().then((user) => {
      //       console.log(`new user created: linkedinID ${user.linkedinID} name ${user.name}`)
      //       return done(null, user)
      //     })
      //  }
    })
  }
  )//new LinkedInStrateg
  )//passport.use
}