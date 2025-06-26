import { Money } from "@/generated/graphql";

export const toDisplayedPrice = (val: Money | undefined | null) => {
  return val ? `${(val.amount).toFixed(2)} ${val.currency}` : "";
};
  