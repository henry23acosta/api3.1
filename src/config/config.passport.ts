import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

const GoogleStrategy = passportGoogle.Strategy;

const GOOOGLE_CLIENT_ID = '19061402103-9ohga1nhuamh92ma1m8nscbj8776i0ll.apps.googleusercontent.com';
const GOOOGLE_CLIENT_SECRET = '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';
const callbackURL = '/register/google/callback';

passport.use(new GoogleStrategy({
    clientID: GOOOGLE_CLIENT_ID,
    clientSecret: GOOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
},
(accessToken: string, resfreshToken: string, profile: passportGoogle.Profile, done: passportGoogle.VerifyCallback)=>{
    console.log(accessToken);
    console.log(resfreshToken);
    console.log(profile);
    console.log(done);
}));