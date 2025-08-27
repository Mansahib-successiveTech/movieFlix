import { connectionDb } from "./config/db.js"
import { Movies } from "./model/movies.js";

const movies = [
    {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    price: 500,
    desc: "A mind-bending thriller about dreams within dreams,a thief enters people's dreams and steals their secrets",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/81DLp4pu+JL._AC_UL480_FMwebp_QL65_.jpg",
  },
    {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    price: 450,
    desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/91Y8iuIIYlL._AC_UL480_FMwebp_QL65_.jpg",
  },
 
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    genre: "Drama",
    year: 1994,
    price: 400,
    desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/91OeWPstRML._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    genre: "Drama",
    year: 1999,
    price: 380,
    desc: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/71Kvfdq-IbL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    price: 360,
    desc: "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with a low IQ.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/71hF50oWkhL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
    genre: "Sci-Fi",
    year: 1999,
    price: 420,
    desc: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/81dOxWm2V1L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "Gladiator",
    director: "Ridley Scott",
    genre: "Action",
    year: 2000,
    price: 400,
    desc: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    language: "English",
    poster: "https://m.media-amazon.com/images/I/91RUaRMOGNL._AC_UL480_FMwebp_QL65_.jpg",
  },
]
connectionDb();
await Movies.deleteMany({});
await Movies.insertMany(movies);
console.log("Data Seeded Successfully");




