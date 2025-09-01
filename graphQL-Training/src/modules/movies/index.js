import { movieMutationResolvers } from "./mutations.js";
import { movieSubscriptionResolvers } from "./subscription.js";

export const movieModule={
    Mutation: movieMutationResolvers, //for mutations
    Subscription: movieSubscriptionResolvers,  // for subscriptions
}