import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js'

//import { UserManagerMondoDB } from "../persistence/daos/mongodb/userManagerMongodb.js";
const userDao = new UserMongoDao();

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const signup = async (req, email, password, done) => {
    try {
        const user = await userDao.getUserByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
}

const login = async (req, email, password, done) => {
    try {
        const user = { email, password }
        const userLogin = await userDao.login(user);
        if (!userLogin) return done(null, false, { msg: "Usuario inexistente" });
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
}

const signupStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);

//req.session.passport.user
passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getUserById(id);
    return done(null, user);
});