import express from 'express';
import { connectionDb } from './config/db.js';
import { moviesRouter } from './routes/movies.js';
import { userRouter } from './routes/user.js';
import { errorHandler } from './middlewares/error.js';
import createError from 'http-errors';
import { favRouter } from './routes/fav.js';
import { cartRouter } from './routes/cart.js';
import { orderRouter } from './routes/order.js';
import { loggerMiddleware } from './middlewares/logger.js';
import { rateLimiter } from './middlewares/rateLimter.js';
import cors from 'cors';
const app=express();
await connectionDb();
app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(loggerMiddleware);

// health check api
app.get("/healthcheck",(req,res)=>{
    res.status(200).json({
        message:"server is running fine"
    })
})
// routes
app.use("/movies",moviesRouter);
app.use("/user",userRouter);
app.use("/fav",favRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);
//handel 404 error
app.use((req, res, next) => {
  next(createError(404, "Not Found route"));
});
app.use(errorHandler);
app.listen(8080,()=>{
    console.log("Server is running at port at http://localhost:8080");
});

// backend/index.js
// import { createServer } from "./server.js";

// const PORT = process.env.PORT || 8080;

// (async () => {
//   const httpServer = await createServer();
//   httpServer.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//     console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
//   });
// })();
