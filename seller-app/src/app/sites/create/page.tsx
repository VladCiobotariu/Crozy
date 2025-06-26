"use client";

import {Box} from "@mui/material";
import React from "react";
import {useRouter} from "next/navigation";
import { AddSiteInput, useAddSiteMutation } from "../../../generated/graphql";
import BackButton from "../../../components/atoms/BackButton";
import { CreateEditSite } from "../../../components/organisms";

const CreateSite = () => {
    const router = useRouter();
    const [addSite, {data, loading, error}] = useAddSiteMutation();

    const onCreateSite = async (data: AddSiteInput) => {
        await addSite({variables: data});
        router.push("/sites");
    }

    return (
        <Box>
            <Box sx={{display: "flex", justifyContent: "flex-start", marginBottom: 5}}>
                <BackButton/>
            </Box>
            <CreateEditSite onFormSubmitted={onCreateSite} />
        </Box>
    );
};

export default CreateSite;
