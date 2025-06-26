"use client";

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetSiteByIdQuery, useUpdateSiteMutation } from "../../../../generated/graphql";
import { CreateEditSite, SiteFormInput } from "../../../../components/organisms";
import BackButton from "../../../../components/atoms/BackButton";
import { useRouteId } from "../../../../hooks";
import { useRouter } from "next/navigation";

type EditSiteQuery = {
    id: string;
}

const EditSiteContent = ({ id }: EditSiteQuery) => {

    const router = useRouter();
    const { loading, error, data } = useGetSiteByIdQuery({ variables: { id } });
    const site: SiteFormInput | null = data?.siteById ?? null;

    const [updateSite, { loading: mutLoading, error: mutErrors }] = useUpdateSiteMutation();

    const onUpdateSite = async (data: SiteFormInput) => {
        await updateSite({ variables: {
            input: {
                id: id,
                name: data.name,
                slug: data.slug,
            }
            }});
        router.push("/sites");
    }


    return loading || mutLoading ? (
        <Typography>Loading...</Typography>
    ) : site ? (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
                <BackButton/>
            </Box>
            <CreateEditSite onFormSubmitted={onUpdateSite} site={site}/>
        </Box>
    ) : (
        <Typography>Sorry, site was not found</Typography>
    );
};

const EditSitePage = () => {
    const id = useRouteId();
    return <>{id ? <EditSiteContent id={id} /> : <CircularProgress /> }</>
}
export default EditSitePage;