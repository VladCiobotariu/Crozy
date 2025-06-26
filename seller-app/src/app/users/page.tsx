"use client"

import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, FormControl, FormHelperText, FormLabel, Input, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { GetOrganisationWithSellersByIdDocument, Role, SellerState, useGetOrganisationWithSellersByIdQuery, useInviteSellerMutation, useRemoveSellerMutation } from "../../generated/graphql";
import { convertRoleToDisplayValue, convertSellerStateToDisplayValue, useOrganisation } from "../../providers/OrganisationProvider";
import React from "react";
import { getComparator, stableSort } from "../../components/atoms/sorting/sorting";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Menu } from '@atoms/Menu';
import { Delete, MoreVert } from "@/components/atoms/icons";
import { ActionKeys } from "@/utils";
import DeleteModal from '@moleculas/modals/DeleteModal';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Tooltip from '@mui/material/Tooltip';

type Data = {
  id: string;
  name: string;
  email: string | undefined | null;
  sellerState: SellerState
  role: Role;
}

type FormInput = {
  email: string;
  role: Role;
};

const TableActionOptions: Array<any> = [
  { icon: <Delete />, label: "Remove", key: ActionKeys.delete },
];

const UsersPage = () => {

  const router = useRouter();
  const { data: session } = useSession()

  const {organisationId, organisationRole} = useOrganisation()  ;
  const {data, loading} = useGetOrganisationWithSellersByIdQuery({variables:{organisationId: organisationId!}, skip: !organisationId});
  const [inviteSeller, {loading: inviteSellerLoading}] = useInviteSellerMutation();

  const [selectedSeller, setSelectedSeller] = React.useState<string | null>(null);  
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setSelectedSeller(null);
  };

  const handleRemoveSeller = (id: string) => {
    setSelectedSeller(id);
    setOpenModalDelete(true);
  };

  const [removeSeller, { loading: mutationRemoveSellerLoading, error }] = useRemoveSellerMutation();
  const onDeleteConfirm = async () => {
    if(selectedSeller) {
      await removeSeller({
        variables: {
          sellerId: selectedSeller
        },
        refetchQueries: [{
          query: GetOrganisationWithSellersByIdDocument,
          variables: {organisationId: organisationId}
        }]
      });
      handleClose();
      router.push("/users");
    }
  }

  const rows : readonly Data[] | null=  (data && data.organisationById.organisation && data.organisationById.organisation.sellers.map((v, i, arr) => {
    return {
      id: v.id,
      name: v.user ? `${v.user.firstName} ${v.user.lastName}` : "",
      email: v.user?.email ?? v.invitation?.email,
      sellerState: v.sellerState,
      role: v.role
    }
  })) ?? null;

  const visibleRows = rows && stableSort(rows, getComparator('asc', 'name'));

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const emails = data?.organisationById.organisation?.sellers.map(v =>
    v.user?.email ?? v.invitation?.email
  )

  const InviteUserSchema = yup.object().shape({
    email: yup.string()
      .email('Must be a valid email')
      .test('checkDuplicateEmail', "Email already registered", function (value){
        return !!emails?.find((v)=>v===value) ? false : true
      })
      .required('This field is required'),
    role: yup.mixed<Role>()
      .oneOf(Object.values(Role))
      .required('This field is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
      defaultValues: {
        email: "",
        role: Role.Seller
      },
      mode: "onSubmit",
      resolver: yupResolver(InviteUserSchema),
  });

  const onSubmit = async (input: FormInput) => {    
    await inviteSeller({
      variables: {email: input.email, role: input.role},
      refetchQueries: [{query: GetOrganisationWithSellersByIdDocument, variables: {organisationId: organisationId}}],
    })
    handleClose()
  };

  return(
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h5" sx={theme=> ({ fontWeight: "600", mb: theme.spacing(4)})}>
        Organisations
      </Typography>
      {(organisationRole === Role.Admin || organisationRole === Role.Owner) &&
        <Button variant="contained" sx={theme=>({mb: theme.spacing(3), width: "140px"})} onClick={handleOpen}>
          Invite User
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite User
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 4 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Box sx={theme=>({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(4),
              })}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        error={errors.email?.message ? true : false}
                        disabled={false}
                        size="small"
                        {...field}
                      />
                      {errors.email?.message &&
                        <FormHelperText
                          sx={{ visibility: "visible", height: "1rem" }}
                          className="form-error"
                          id="email-error-text"
                        >
                          {errors?.email?.message || ""}
                        </FormHelperText>
                      }
                    </FormControl>
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field: { onChange, ...otherFields } }) => (
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        label="Role"
                        {...otherFields}
                        {...register("role")}
                        onChange={(event) => {
                          onChange(event.target.value as Role);
                        }}
                      >
                        {(Object.values(Role) as Array<Role>).map((x) => (
                          <MenuItem key={x} value={x}>
                            {convertRoleToDisplayValue(x)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Box sx={theme=>({
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                })}>
                  <LoadingButton type="submit" variant="contained" size="large" loading={inviteSellerLoading}>
                    Invite
                  </LoadingButton>
                  <Button sx={theme=>({
                    px: theme.spacing(3),
                  })} color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      <DeleteModal 
        open={openModalDelete} 
        handleClose={handleCloseModalDelete} 
        onDeleteConfirm={onDeleteConfirm} entity="seller"
        customTitle='Are you sure you want to remove this seller from your organisation?'
        customText='You cannot undo this action.'
      />
      {!loading ?
        <TableContainer component={Paper} sx={{width: "fit-content"}}>
          <Table sx={{ width: "fit-content" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={theme=>({fontWeight: "600", px: theme.spacing(3),})}>Name</TableCell>
                <TableCell sx={theme=>({fontWeight: "600", px: theme.spacing(3),})} align="left">Email</TableCell>
                <TableCell sx={theme=>({fontWeight: "600", px: theme.spacing(3),})} align="right">Status</TableCell>
                <TableCell sx={theme=>({fontWeight: "600", px: theme.spacing(3),})} align="right">Role</TableCell>
                {(organisationRole === Role.Admin || organisationRole === Role.Owner) &&
                  <TableCell sx={theme=>({fontWeight: "600", px: theme.spacing(3),})} align="right">Action</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows && visibleRows.map(item=> (
                <TableRow
                  key={item.id}
                  sx={theme=>({ 
                    '&:last-child td, &:last-child th': { 
                      border: 0 
                    },
                  })}
                >
                  <TableCell component="th" scope="row" sx={theme=>({
                    pr: theme.spacing(6),
                    px: theme.spacing(3),
                    width: "200px",
                  })}>
                    <Typography>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={theme=>({
                    pr: theme.spacing(6),
                    px: theme.spacing(3),
                  })} component="th" scope="row">
                    {item.email}
                  </TableCell>
                  <TableCell sx={theme=>({
                    pr: theme.spacing(6),
                    px: theme.spacing(3),
                    textAlign: "right"
                  })} component="th" scope="row">
                    {convertSellerStateToDisplayValue(item.sellerState)}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={theme=>({
                    px: theme.spacing(3),
                  })}>
                    {convertRoleToDisplayValue(item.role)}
                  </TableCell>
                  {(organisationRole === Role.Admin || organisationRole === Role.Owner) &&
                    <TableCell component="th" scope="row" sx={theme=>({
                      px: theme.spacing(3),
                    })}>
                      <Menu
                        disabled={(item.email === session?.user.email) || item.role === Role.Owner}
                        iconButton
                        options={TableActionOptions}
                        onClick={itemKey => {
                          switch (itemKey) {
                            case ActionKeys.delete:
                              return handleRemoveSeller(item.id);
                            default:
                              return;
                          }
                        }}
                      >
                        <MoreVert />
                      </Menu>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : 
        <CircularProgress size={40} thickness={4}/>
      }
    </Box>
  )
}

export default UsersPage