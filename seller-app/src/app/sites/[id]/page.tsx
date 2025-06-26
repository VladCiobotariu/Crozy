"use client";

import React from "react";
import { useGetSiteByIdQuery } from "../../../generated/graphql";
import { Box, CircularProgress } from "@mui/material";
import BackButton from "../../../components/atoms/BackButton";
import { Typography } from "../../../components/atoms";
import { useRouteId } from "../../../hooks";

type ViewSiteQuery = {
  id: string;
};

const ViewSiteContent = ({ id }: ViewSiteQuery) => {
  const {loading, error, data} = useGetSiteByIdQuery({variables: {id}});

  return loading ? (
    <Typography>Loading page...</Typography>
  ) : (
    data?.siteById && (
      <Box>
        <Box sx={{display: "flex", justifyContent: "flex-start", marginBottom: 5}}>
             <BackButton/>
        </Box>
        <Typography variant="b3_subhead">{data.siteById?.name}</Typography>
        <Box maxWidth="md" width={1 / 4}>
          {/* <img src={imageUrl} alt={data.siteById?.name} /> */}
        </Box>
      </Box>
    )
  );
};

const ViewSitePage = () => {
  const id = useRouteId();
  return <>{id ? <ViewSiteContent id={id} /> : <CircularProgress /> }</>
};

export default ViewSitePage;
