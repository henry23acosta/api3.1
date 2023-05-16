"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const GOOOGLE_CLIENT_ID = '19061402103-9ohga1nhuamh92ma1m8nscbj8776i0ll.apps.googleusercontent.com';
const GOOOGLE_CLIENT_SECRET = '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';
const callbackURL = '/register/google/callback';
passport_1.default.use(new GoogleStrategy({
    clientID: GOOOGLE_CLIENT_ID,
    clientSecret: GOOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
}, (accessToken, resfreshToken, profile, done) => {
    console.log(accessToken);
    console.log(resfreshToken);
    console.log(profile);
    console.log(done);
}));
