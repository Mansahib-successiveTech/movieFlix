"use client";
import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";

const MOVIE_ADDED_SUBSCRIPTION = gql`
  subscription MovieAdded {
    movieAdded {
      id
      title
    }
  }
`;

export default function SubscriptionTest() {
  const { data, error } = useSubscription(MOVIE_ADDED_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      console.log("[SubscriptionTest] Subscription data received:", data);
    }
    if (error) {
      console.error("[SubscriptionTest] Subscription error:", error);
    }
  }, [data, error]);

  return null;
}