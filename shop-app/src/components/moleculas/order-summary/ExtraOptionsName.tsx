import { ExtraOptionDetails } from "@/components/organisms/order-history/OrderItemSlot"
import { Box, Typography } from "@mui/joy"

type ExtraOptionsNamesProps = {
  productExtraOptions: ExtraOptionDetails[]
}

const ExtraOptionsNames = ({productExtraOptions}: ExtraOptionsNamesProps) => {
  return(
    <>
      {productExtraOptions.length!==0 &&
        <Box>
          <Typography level="title-sm" sx={{
            display: "inline",
          }}>
            Extras:{" "}
          </Typography>
          {productExtraOptions.map((extraOption)=>(
            <Typography key={extraOption.id} level="body-md" sx={{
              display: "inline",
            }}>
              {extraOption.name}
              {productExtraOptions.at(productExtraOptions.length - 1) !== extraOption && (
                ", "
              )}
            </Typography>
          ))}
        </Box>
        }
    </>
  )
}

export default ExtraOptionsNames