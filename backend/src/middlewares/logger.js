export const loggerMiddleware=(req,res,next)=>{
    try{
        console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
        next();
    }
    catch(err){
        console.log("Error in logger middleware",err.message);
    }
}