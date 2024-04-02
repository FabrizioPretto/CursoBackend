import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js'
//import { UserManagerMondoDB } from '../persistence/daos/mongodb/userManagerMongodb.js';
const userDao = new UserMongoDao();

//https://console.cloud.google.com/welcome?pli=1&project=e-commerce-3971f
const strategyOptions = {
    clientID: '56153686882-5nlu770ig6fhl975g2alpkomh4hvv04d.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/users/oauth2/redirect/accounts.google.com',
    scope: ['profile', 'email'],
    state: true
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const email = profile._json.email;
    const user = await userDao.getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.register({
        first_name: profile._json.name,
        last_name: profile._json.family_name,
        email,
        image: profile._json.picture,
        isGoogle: true
    })
    return done(null, newUser);
}

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin));


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((id, done) => {
    done(null, id);
})