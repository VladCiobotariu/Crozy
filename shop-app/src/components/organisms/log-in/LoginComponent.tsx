"use client";

import { signIn } from "next-auth/react";
import React, { useEffect } from "react";

const LoginComponent = () => {
    useEffect(() => {
        signIn("azure-ad-b2c", {callbackUrl: "/"});
    }, [])
    return (
        <></>
    );
};

export default LoginComponent;