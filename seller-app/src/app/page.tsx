"use client" 

import { Box, Button, Typography } from "@mui/material";
import { useOrdersSummaryQuery } from "../generated/graphql"
import SimpleCardItem from "../components/moleculas/SimpleCardItem";

const Page = () => {

    const {loading, data} = useOrdersSummaryQuery({fetchPolicy: "network-only"});

    return (
      <>
        {data?.ordersSummary && (
          <>
          <Button href="/orders">View all your orders</Button>
          <Box sx={{ gap: 2, display: "flex", flexDirection: "column", mt:2 }}>
            <Box>
              {data.ordersSummary.newOrders !== 0 && (
                <SimpleCardItem maxWidth={275}>
                  <Typography>
                    New Orders: {data.ordersSummary.newOrders}
                  </Typography>
                </SimpleCardItem>
              )}
            </Box>
            <Box>
              {data.ordersSummary.processingOrders !== 0 && (
                <SimpleCardItem maxWidth={275}>
                  <Typography>
                    Orders in processing: {data.ordersSummary.processingOrders}
                  </Typography>
                </SimpleCardItem>
              )}
            </Box>
          </Box>
          </>
        )}
    
        {!data?.ordersSummary && <Box>No orders which require your attention</Box>}
    </>
    );
    
};

export default Page;
