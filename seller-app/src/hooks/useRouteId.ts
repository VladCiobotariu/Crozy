import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export type RouteQuery = {
  id: string;
};

export function useRouteId() {
  const params = useParams<RouteQuery>();
  if (params) {
    const { id } = params;
    return decodeURIComponent(id);
  }
  return null;
}
