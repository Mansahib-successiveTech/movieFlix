import { pubsub } from "../../server/pubsub.js";

export const movieSubscriptionResolvers={
    movieAdded: {
        subscribe: () => pubsub.asyncIterableIterator(["Movie_ADDED"]),
    }
}