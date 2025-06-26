import { ExtraOption, ExtraOptionCategory } from "@/generated/graphql"
import { Typography, useTheme } from "@mui/material"
import { Box, useMediaQuery } from "@mui/system"
import ExtraOptions from "./ExtraOptions"

type ExtraOptionsProductProps = {
  extraOptions: ExtraOption[]
  showTitle?: boolean
}

const ExtraOptionsProduct = ({extraOptions, showTitle = true}: ExtraOptionsProductProps) => {

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  const variantForLabel = isSmallSize ? "subtitle1" : "h6";

  const categoryMap = new Map();
  extraOptions.forEach(x => {
    if (x.category?.id && !categoryMap.has(x.category.id)) {
      categoryMap.set(x.category.id, x.category);
    }
  });

  const uniqueCategories : ExtraOptionCategory[] = Array.from(categoryMap.values());

  return(
    <Box sx={theme=>({
      height: "fit-content",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      mt: theme.spacing(1)
    })}>
      {showTitle &&
        <Typography variant={variantForLabel} sx={{ fontWeight: "bold" }}>
          Extra Options:
        </Typography>
      }
      {uniqueCategories.map(x=>
        (
          <Box key={x.id} sx={theme=>({
            mt: theme.spacing(1)
          })}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              - {x.name}:
            </Typography>
            <Box sx={theme=>({
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing(3),
              rowGap: theme.spacing(1),
            })}>
              <ExtraOptions extraOptions={extraOptions.filter(item=> x.id == item.category?.id)}/>
            </Box>
          </Box>
        )
      )}
    </Box>
  )
}

export default ExtraOptionsProduct;