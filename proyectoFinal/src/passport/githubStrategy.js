import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import { UserManagerMondoDB } from '../daos/mongodb/userManagerMongodb.js';
const userDao = new UserManagerMondoDB();

const strategyOptions = {
    clientID: 'Iv1.3b0d38b52c66e68f',
    clientSecret: 'a063702af7ce220b72160ac5e9a9cf03caeae126',
    callbackURL: 'http://localhost:8080/users/github'
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    const email = profile._json.email;
    const user = await userDao.getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.register({
        first_name: profile._json.name,
        email,
        isGithub: true
    })
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
