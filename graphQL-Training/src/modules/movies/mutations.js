import axios from "axios";

export const movieMutationResolvers = {
  addMovie: async (_, args, context) => {
    const { pubsub, token } = context;

    if (!token) {
      throw new Error("Not authorized"); // ensure token exists
    }

    // ✅ call REST route on the same server
    const res = await axios.post(
      "http://localhost:8080/movies/addmovie", // REST endpoint
      args,
      {
        headers: { authorization: "Bearer " + token }, // send token
      }
    );

    const movie = res.data.movie;

    const movieForGraphQL = {
      ...movie,
      id: movie._id, // map _id → id for GraphQL
    };

    // Publish subscription
    pubsub.publish("Movie_ADDED", { movieAdded: movieForGraphQL });

    return movieForGraphQL;
  },
};
