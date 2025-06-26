import { ExtraOption } from "@/generated/graphql"
import { Box, IconButton, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { toDisplayedPrice } from "@/utils";
import { Edit } from "@mui/icons-material";

type ExtraOptionsProps = {
  rowGap?: number
  columnGap?: number
  displayItemsOnColumn?: boolean 
  extraOptions: ExtraOption[]
  onDeleteExtraOption?: (id: string) => void
  onUpdateExtraOption?: (id: string) => void
}

const ExtraOptions = ({ extraOptions, onDeleteExtraOption, onUpdateExtraOption, displayItemsOnColumn = false, rowGap = 1, columnGap = 3}: ExtraOptionsProps) => {
  return(
    <Box sx={theme=>({
      display: "flex",
      flexDirection: displayItemsOnColumn ? "column" : "row",
      flexWrap: displayItemsOnColumn ? "nowrap" : "wrap",
      columnGap: theme.spacing(columnGap),
      rowGap: theme.spacing(rowGap),
    })}>
      {extraOptions.map(x=>
        (
          <Box key={x.id} sx={theme=>({
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: theme.spacing(1)
          })}>
            {onDeleteExtraOption &&
              <IconButton color="error"
                onClick={()=>onDeleteExtraOption(x.id)} 
                size="small">
                <ClearIcon/>
              </IconButton>
            }
            {onUpdateExtraOption &&
              <IconButton color="primary"
                onClick={()=>onUpdateExtraOption(x.id)} 
                size="small">
                <Edit/>
              </IconButton>
            }
            <Typography>
              {x.name}
            </Typography>
            <Typography>
              {toDisplayedPrice(x.price)}
            </Typography>
          </Box>
        )
      )}
    </Box>
  )
}

export default ExtraOptions