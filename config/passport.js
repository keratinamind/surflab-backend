const passport = require("passport");
const { Strategy: JwtStrategy , ExtractJwt} = require("passport-jwt");
const {Customer} = require("../models");

const jwtStrategy = new JwtStrategy(
    { secretOrKey: process.env.SECRET_KEY , jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }
    ,
    async (payload, done) => {
        try {
            const customer = await Customer.findOne({where: {id:payload.id}});
            if (!customer) done(null,false);
            done(null,customer)
        } catch (err) {
            done(err,false)
        }
    }
)

passport.use("jwt-customer", jwtStrategy);