const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req, res,next){
        const token = req.header('authentication-token');    
        if(!token) return res.status(401).send('Access denied, No Token Provided.')
       
        // test split bearer token
        const trySplit = token.split(" ")

        try {
            // verify the json token
            const decoded = jwt.verify(trySplit[1], config.get('jwtPrivateKey'));
            req.user = decoded;

            

            next();
        }
        catch (ex){
            res.status(400).send('invalid token.');
        }


}

module.exports = auth;