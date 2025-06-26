"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useRouteId } from "../../../../hooks";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../../../generated/graphql";
import { CategoryFormInput, CreateEditCategory } from "../../../../components/organisms";
import { Box, CircularProgress, Typography } from "@mui/material";
import BackButton from "../../../../components/atoms/BackButton";

type EditCategoryQuery = {
    id: string;
}

const EditCategoryContent = ({ id }: EditCategoryQuery) => {
    const router = useRouter();

    const { loading, error, data } = useGetCategoryByIdQuery({ variables: { id } });
    const category: CategoryFormInput | null = data?.categoryById ?? null;


    const [updateCategory, { loading: mutLoading, error: mutErrors }] = useUpdateCategoryMutation();

    const onUpdateCategory = async (data:CategoryFormInput) => {
        await updateCategory({ variables: {
            input: {
                id: id,
                name: data.name,
                slug: data.slug,
                description: data.description,
                displayNumber: Number(data.displayNumber),
            }
            }});
        router.push("/categories");
    };

    return loading || mutLoading ? (
        <Typography>Loading...</Typography>
    ) : category ? (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
                <BackButton/>
            </Box>
            <CreateEditCategory onFormSubmitted={onUpdateCategory} category={category}/>
        </Box>

    ) : (
        <Typography>Sorry, category was not found</Typography>
    );
};

const EditCategoryPage = () => {
    const id = useRouteId();
    return <>{id ? <EditCategoryContent id={id} /> : <CircularProgress /> }</>
}

export default EditCategoryPage;