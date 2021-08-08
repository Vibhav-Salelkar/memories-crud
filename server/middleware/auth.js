import jwt from 'jsonwebtoken';

//user wants to like a post
//click the like button => auth middleware confirms or denies the request.
//only then like controller...
//we pass this auth in routes and modify necessary controllers

const auth = async (req, res, next) => {
    try {
        //get token of authenticated user and check if it is custom token or done via google authentication.
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            //populate userId to identify if user is authenticated or not in controllers
            req.userId = decodedData?.id;
        }else {
            decodedData = jwt.decode(token);

            //populate userId to identify if user authenticated or not in controllers: Note: here sub is id name in google authentication
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;