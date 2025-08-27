import express from 'express';
import { addMovie, allMovies, deleteMovies, movieById, moviesByGenre, moviesByLanguage, recentMovies, updateMovies } from '../controllers/movies.js';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';

const moviesRouter=express.Router();
moviesRouter.get("/allmovies",allMovies); //all movies
moviesRouter.get("/moviebyid/:id",movieById) // get movie by id
moviesRouter.get("/recentmovies",recentMovies) // get recent movies
moviesRouter.get("/genre/:genre",moviesByGenre) // get movies by genre
moviesRouter.get("/language/:language",moviesByLanguage) // get movies by language
moviesRouter.post("/addmovie",authMiddleware,adminMiddleware,addMovie) // only admin can add movie
moviesRouter.put("/updatemovie/:id",authMiddleware,adminMiddleware,updateMovies) // only admin can update movie
moviesRouter.delete("/deletemovie/:id",authMiddleware,adminMiddleware,deleteMovies) // only admin can delete movie
export {moviesRouter};