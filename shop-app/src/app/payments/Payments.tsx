"use client";
import { Button } from "@mui/joy";

import React, { useEffect, useRef, useState } from "react";

type PaymentsProps = {
  data: string;
  envKey: string;
  cipher: string;
  iv: string;
  paymentUri: string;
};

const Payments = ({ cipher, data, iv, envKey, paymentUri }: PaymentsProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const currentId = formRef.current?.id;
  useEffect(() => {
    if (formRef.current) {
      formRef.current?.submit();
    }
  }, [currentId]);
  return (
    <>
      <form ref={formRef} action={paymentUri} method="POST">
        <input type="hidden" name="data" value={data} readOnly />
        <input type="hidden" name="env_key" value={envKey} readOnly />
        <input type="hidden" name="cipher" value={cipher} readOnly />
        <input type="hidden" name="iv" value={iv} readOnly />
        <Button type="submit" style={{ visibility: "hidden" }}>
          Pay
        </Button>
      </form>
    </>
  );
};

export default Payments;
