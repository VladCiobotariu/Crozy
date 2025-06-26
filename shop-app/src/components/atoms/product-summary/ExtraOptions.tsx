import { ExtraOption, ExtraOptionCategory } from "@/providers/BasketProvider";
import { useFeatureFlags } from "@/providers/FeatureFlagsProvider";
import Currency from "@atoms/Currency";
import { Box, Checkbox, Typography } from "@mui/joy";
import React from "react";

type ExtraOptionsProps = {
  productExtraOptions: ExtraOption[];
  onExtraOptionsAdded: (extraOptions: ExtraOption) => void;
  onExtraOptionsRemoved: (extraOptions: ExtraOption) => void;
};

const ExtraOptions = ({ productExtraOptions, onExtraOptionsAdded, onExtraOptionsRemoved }: ExtraOptionsProps) => {
  const {
    flags: { extraOptionsEnabled },
  } = useFeatureFlags();

  const categoryMap = new Map();
  productExtraOptions.forEach(x => {
    if (x.category?.id && !categoryMap.has(x.category.id)) {
      categoryMap.set(x.category.id, x.category);
    }
  });

  const uniqueCategories : ExtraOptionCategory[] = Array.from(categoryMap.values());

  return extraOptionsEnabled && productExtraOptions.length !== 0 ?
    <Box sx={theme=>({
      height: "fit-content",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3)
    })}>
      {uniqueCategories.map(x=>
        (
          <Box key={x.id}>
            <Typography level="title-sm">
              {x.name}
            </Typography>
            <Box sx={theme=>({
              mt: theme.spacing(1),
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: theme.spacing(3),
            })}>
              {productExtraOptions.filter(item=> x.id == item.extraOptionCategoryId).map(x=>
                (
                  <Box key={x.id} sx={theme=>({
                    display: "flex",
                    flexDirection: "row",
                    gap: theme.spacing(1)
                  })}>
                    <Checkbox
                      variant="outlined" 
                      label={x.name}
                      onChange={(event) => {
                        if(event.target.checked){
                          onExtraOptionsAdded(x)
                        } else {
                          onExtraOptionsRemoved(x)
                        }
                      }}
                    />
                    <Currency price={x.price} sx={{fontWeight: "700"}} variant="normal"/>
                  </Box>
                )
              )}
            </Box>
          </Box>
        )
      )}
    </Box> 
    :
    <></>;
};

export default ExtraOptions;
