const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { authorization} = req.headers;
    
    // console.log(authorization);

    if(!authorization) {
        return res.status(401).send({ error: "No token provided" });
    }
    const taken  = authorization.replace("Bearer", "")

    // console.log(taken);
    jwt.verify(token.process.env.JWT_SECRET_KEY, async (err, payload) =>{
        if(err) {
            return res.status(401).json({error:" tou must be looged in ,Token invalid"});
        }
        const {_id} = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        }) 
    });
    
}
