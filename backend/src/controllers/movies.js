import { Movies } from "../model/movies.js";
//all movies
export const allMovies =async (req, res) => {
  try{
  const results =await Movies.find({});  
  res.status(200).json({
    message: "All movies fetched successfully",
    movie: results,
  });
}
catch(err){
    res.status(500).json({
        message:"Error in fetching all movies",
        error:err.message
    }); 
  }
}
//get movie by id
export const movieById=async(req,res)=>{
  const {id}=req.params;
  try{
  const existingMovie=await Movies.findById(id);
  if(!existingMovie){   
    return res.status(404).json({
        message:"Movie not found"
    });
  }
  return res.status(200).json({
    message:"Movie fetched successfully",
    movie:existingMovie
  }); 
}
catch(err){
    res.status(500).json({
        message:"Error in fetching movie by id",
        error:err.message
    });
}
}
//get recent movies
export const recentMovies=async(req,res)=>{
  try{
  const results =await Movies.find({}).sort({createdAt:-1}).limit(4);  
  res.status(200).json({
    message: "Recent movies fetched successfully",
    movie: results,
  });
}catch(err){
    res.status(500).json({
        message:"Error in fetching recent movies",
        error:err.message
    });
  }

}

//add movie
export const addMovie=async(req,res)=>{
  const {title,director,genre,year,price,desc,language,poster}=req.body;
  try{
  if(!title || !director || !genre || !year || !price || !desc || !language || !poster){
    return res.status(400).json({
        message:"All fields are required"
    });
  }
  const newMovie=new Movies({
    title,
    director,
    genre,
    year,
    price,
    desc,
    language,
    poster
  });
  await newMovie.save();
  return res.status(201).json({
    message:"Movie added successfully",
    movie:newMovie
  });
}
catch(err){
    res.status(500).json({
        message:"Error in adding movie",
        error:err.message
    });
  }
}
//update movie
export const updateMovies=async(req,res)=>{
  const {id}=req.params;
  try{
  const {title,director,genre,year,price,desc,language,poster}=req.body;
  const existingMovie=await Movies.findById(id);
  if(!existingMovie){   
    return res.status(404).json({
        message:"Movie not found"
    });
  }
  existingMovie.title=title || existingMovie.title;
  existingMovie.director=director || existingMovie.director;
  existingMovie.genre=genre || existingMovie.genre;     
  existingMovie.year=year || existingMovie.year;
  existingMovie.price=price || existingMovie.price;
  existingMovie.desc=desc || existingMovie.desc;
  existingMovie.language=language || existingMovie.language;
  existingMovie.poster=poster || existingMovie.poster;
  await existingMovie.save();
  return res.status(200).json({
    message:"Movie updated successfully",
    movie:existingMovie
  });
  }catch(err){
    res.status(500).json({
        message:"Error in updating movie",
        error:err.message
    });
  } 
}
//delete movie
export const deleteMovies=async(req,res)=>{

  const {id}=req.params;
  try{
  const existingMovie=await Movies.findById(id);
  if(!existingMovie){   
    return res.status(404).json({
        message:"Movie not found"
    });
  }
  await Movies.findByIdAndDelete(id);
  return res.status(200).json({
    message:"Movie deleted successfully"
  }); 
}catch(err){
    res.status(500).json({
        message:"Error in deleting movie",
        error:err.message
    });
  }
}

//get movies from genre
export const moviesByGenre=async(req,res)=>{
  const {genre}=req.params;
  try{
  const results =await Movies.find({genre:genre});  
  res.status(200).json({
    message: `Movies of genre ${genre} fetched successfully`,
    movie: results,
  });
}catch(err){
    res.status(500).json({
        message:"Error in fetching movies by genre",
        error:err.message
    });
  }
}
//get movies from language
export const moviesByLanguage=async(req,res)=>{
  const {language}=req.params;
  try{
  const results =await Movies.find({language:language});  
  res.status(200).json({
    message: `Movies of language ${language} fetched successfully`,
    movie: results,
  });
}
catch(err){
    res.status(500).json({
        message:"Error in fetching movies by language",
        error:err.message
    });
  }
}
//schrema for movie
// {
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     genre: "Crime",
//     year: 1972,
//     price: 450,
//     desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
//     language: "English",
//     poster: "https://m.media-amazon.com/images/I/91Y8iuIIYlL._AC_UL480_FMwebp_QL65_.jpg",
//   },