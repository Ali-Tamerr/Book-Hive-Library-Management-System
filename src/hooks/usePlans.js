import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../services/api.config";
import { adminQueryOptions } from "./queryConfig";

const FALLBACK_PLANS = [
  {
    id: "Discover",
    title: "Discover",
    price_per_month: 0,
    borrow_limit: 3,
    loan_period_days: 14,
    renewal_limit: 1,
    isPopular: false,
  },
  {
    id: "Professional",
    title: "Professional",
    price_per_month: 9.99,
    borrow_limit: 8,
    loan_period_days: 21,
    renewal_limit: 2,
    isPopular: true,
  },
  {
    id: "Enterprise",
    title: "Enterprise",
    price_per_month: 19.99,
    borrow_limit: 15,
    loan_period_days: 30,
    renewal_limit: 3,
    isPopular: false,
  },
];

const normalizePlan = (plan) => ({
  id: plan?.id || plan?.plan || "Discover",
  title: plan?.title || plan?.name || plan?.id || "Discover",
  price_per_month: Number(plan?.price_per_month ?? plan?.price ?? 0),
  borrow_limit: Number(plan?.borrow_limit ?? 3),
  loan_period_days: Number(plan?.loan_period_days ?? 14),
  renewal_limit: Number(plan?.renewal_limit ?? 1),
  isPopular: Boolean(plan?.isPopular),
});

const getAllPlans = async () => {
  try {
    const response = await apiGet("/Plans");

    if (Array.isArray(response)) {
      return response.map(normalizePlan);
    }

    if (Array.isArray(response?.data)) {
      return response.data.map(normalizePlan);
    }

    return FALLBACK_PLANS;
  } catch (error) {
    console.warn("Failed to fetch plans from API, using fallback plans.", error);
    return FALLBACK_PLANS;
  }
};

export const planKeys = {
  all: ["plans"],
  lists: () => [...planKeys.all, "list"],
};

export const usePlans = () => {
  return useQuery({
    queryKey: planKeys.lists(),
    queryFn: getAllPlans,
    ...adminQueryOptions,
  });
};
