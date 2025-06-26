"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PaymentSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/orders/last-order");
  },[]);
  return <div></div>;
};

export default PaymentSuccess;
