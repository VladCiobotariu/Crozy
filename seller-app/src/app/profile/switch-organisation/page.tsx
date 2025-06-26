"use client";

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useGetMySellerQuery } from "../../../generated/graphql";
import Paper from '@mui/material/Paper';
import { convertRoleToDisplayValue, useOrganisation } from "../../../providers/OrganisationProvider";
import SwitchOrganisationButton from "../../../components/moleculas/SwitchOrganisationButton";

const SwitchOrganisationPage = () => {

  const { data, loading } = useGetMySellerQuery()
  const { organisationId, setOrganisationId: setOrganisationIdLocal} = useOrganisation()

  const setOrganisationId = (value: string) => {
    setOrganisationIdLocal(value)
  }

  return (
    <>
      <Typography variant="h5" sx={theme=> ({ fontWeight: "600", mb: theme.spacing(4)})}>
        Organisations
      </Typography>
      {!loading && data ?
        <TableContainer component={Paper} sx={{width: "fit-content"}}>
          <Table sx={{ width: "fit-content" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: "600"}}>Organisation Name</TableCell>
                <TableCell sx={{fontWeight: "600"}} align="center">Action</TableCell>
                <TableCell sx={{fontWeight: "600"}} align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.mySeller.seller?.user?.sellers.map(item=> (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" height={36} sx={theme=>({
                    width: "300px",
                  })}>
                    <Typography>
                      {item.organisation.name}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" height={36}>
                  {organisationId &&
                    <SwitchOrganisationButton organisationId={item.organisationId} onClickSetOrganisationId={setOrganisationId} isCurrentOrganisation={organisationId===item.organisationId}/>
                  }
                  </TableCell>
                  <TableCell component="th" scope="row" height={36}>
                    <Typography>
                      {convertRoleToDisplayValue(item.role)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : 
        <CircularProgress size={40} thickness={4}/>
      }
    </>
  );
};

export default SwitchOrganisationPage;
