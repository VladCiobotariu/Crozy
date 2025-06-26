"use client";

import { useQuery } from "@apollo/client";
import { Box, Button, Skeleton, Typography, useTheme } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import { useMediaQuery } from "@mui/system";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import EmptyShoppingCart from "@/components/organisms/shopping-cart/EmptyAlert";
import OrderCard from "@/components/organisms/order-history/OrderCard";
import { useSession } from "next-auth/react";
import { graphql } from "@/gql";

function labelDisplayedRows({
                              from,
                              to,
                              count,
                            }: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

const getAllOrdersForMeQueryDocument = graphql(/* GraphQL */ `
  query getAllOrdersForMeQuery($first: Int, $last: Int, $after: String, $before: String){
    ordersForMe(first: $first, last: $last, after: $after, before: $before, order: [{orderDateTime: DESC}]){
      edges {
        node{
          id
          ...OrderCardFields
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`);

const OrderHistoryPage = () => {

  const theme = useTheme();
  const { status } = useSession();

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data, refetch, error, loading} = useQuery(getAllOrdersForMeQueryDocument, {
    variables: {
      first: rowsPerPage,
      after: undefined,
    },
    skip: status === "unauthenticated"
  })
  const [lastElement, setLastElement] = useState<string | null | undefined>(undefined);
  const [firstElement, setFirstElemet] = useState<string | null | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));

  const getLabelDisplayedRowsTo = () => {
    if (data?.ordersForMe?.totalCount) {
      if (data?.ordersForMe?.totalCount === -1) {
        return (page + 1) * rowsPerPage;
      }
      return rowsPerPage === -1
        ? data?.ordersForMe?.totalCount
        : Math.min(data?.ordersForMe?.totalCount, (page + 1) * rowsPerPage);
    } else return 0;
  };

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  useEffect(() => {
    if (data?.ordersForMe) {
      setLastElement(data?.ordersForMe?.pageInfo.endCursor);
    }
  }, [data]);

  const handleChangePageNext = (newPage: number) => {
    setPage(newPage);
    refetch({ first: rowsPerPage, after: lastElement, last: undefined, before: undefined }).then(res => {
      setLastElement(res?.data.ordersForMe?.pageInfo.endCursor);
      setFirstElemet(res.data.ordersForMe?.edges?.at(0)?.cursor);
    });

  };
  const handleChangePagePrevious = (newPage: number) => {
    setPage(newPage);
    refetch({ last: rowsPerPage, before: firstElement, first: undefined, after: undefined }).then(res => {
      setFirstElemet(res.data.ordersForMe?.edges?.at(0)?.cursor);
      setLastElement(res?.data.ordersForMe?.pageInfo.endCursor);
    });

  };

  return (
    <>
      {status === "unauthenticated" ? (
          <>Please sign in. </>
      ):(
        <Box sx={theme => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
        })}
        >
          <Typography level="h3">Comenzile mele</Typography>
          <Typography level="body-md">Lista cu toate comenzile</Typography>
          {loading ?
            <Box sx={theme => ({
              width: "100%",
              padding: theme.spacing(3),
              [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(2),
              },
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            })}>
              <Box sx={theme => ({
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(5),
                [theme.breakpoints.down("sm")]: {
                  gap: theme.spacing(2),
                  flexDirection: "column",
                },
              })}>
                <Box sx={theme => ({
                  display: "flex",
                  flexDirection: "column",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "row",
                  },
                  gap: theme.spacing(1),
                })}>
                  <Typography level="title-sm">
                    <Skeleton>
                      {isMediumSize ? "Nr." : "Numărul comenzii"}
                    </Skeleton>
                  </Typography>
                  <Typography level="body-md">
                    <Skeleton>
                      {"ON-000001"}
                    </Skeleton>
                  </Typography>
                </Box>
                {!isMediumSize && (
                  <Box sx={theme => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(1),
                  })}>
                    <Typography>
                      <Skeleton level="title-sm">
                        {"Data"}
                      </Skeleton>
                    </Typography>
                    <Typography level="body-md">
                      <Skeleton>
                        {"30 May 9999, 00:00"}
                      </Skeleton>
                    </Typography>
                  </Box>
                )}
                <Box sx={theme => ({
                  display: "flex",
                  flexDirection: "column",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "row",
                  },
                  gap: theme.spacing(1),
                })}>
                  <Typography>
                    <Skeleton level="title-sm">
                      {"Total"}
                    </Skeleton>
                  </Typography>
                  <Typography level="body-md">
                    <Skeleton>
                      {"999.99 lei"}
                    </Skeleton>
                  </Typography>
                </Box>
                <Box sx={theme => ({
                  display: "flex",
                  flexDirection: "column",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "row",
                  },
                  gap: theme.spacing(1),
                })}>
                  <Typography level="title-sm">
                    <Skeleton>
                      {"Status"}
                    </Skeleton>
                  </Typography>
                  <Typography level="body-md">
                    <Skeleton>
                      {"Processing"}
                    </Skeleton>
                  </Typography>
                </Box>
              </Box>
              <Box sx={theme => ({
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(2),
                [theme.breakpoints.down("sm")]: {
                  gap: theme.spacing(1),
                },
                alignItems: "center",
              })}>
                <Skeleton variant="rectangular">
                  <Button variant="outlined">
                    Arată
                  </Button>
                </Skeleton>
                <Skeleton variant="rectangular" width={20} height={20} />
              </Box>
            </Box> : data?.ordersForMe?.totalCount == 0 ?
              <EmptyShoppingCart link={"/"} highlightedText={"magazin."}
                                 text={"Nu ai nici o comandă plasată, poți adăuga produse din"} /> :
              <>
                {data?.ordersForMe?.edges &&
                  <AccordionGroup sx={theme => ({
                    borderRadius: "10px",
                    border: 1,
                    borderColor: theme.vars.palette.divider,
                  })}>
                    {data?.ordersForMe?.edges.map(order => (
                      <OrderCard
                        order={order.node}
                        key={order.node.id}
                        isLast={data?.ordersForMe?.edges?.at(data?.ordersForMe?.edges?.length - 1) === order}
                        isFirst={data?.ordersForMe?.edges?.at(0) === order}
                      />
                    ))}
                  </AccordionGroup>
                }
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel>Elemente per pag:</FormLabel>
                    <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
                  {data?.ordersForMe?.edges &&
                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                      {labelDisplayedRows({
                        from: data?.ordersForMe?.totalCount === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: data?.ordersForMe?.totalCount === -1 ? -1 : data?.ordersForMe?.totalCount,
                      })}
                    </Typography>
                  }
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePagePrevious(page - 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    {data?.ordersForMe?.edges &&
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          data?.ordersForMe?.edges.length !== -1
                            ? page >= Math.ceil(data?.ordersForMe?.totalCount / rowsPerPage) - 1
                            : false
                        }
                        onClick={() => handleChangePageNext(page + 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    }
                  </Box>
                </Box>
              </>
          }
        </Box>
      )}
    </>
  );
};

export default OrderHistoryPage;
