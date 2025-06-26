import { Box, Button, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type ActionButtonProps = {
  isCurrentOrganisation: boolean
  organisationId: string
  onClickSetOrganisationId(value: string): void
}
  
const SwitchOrganisationButton = ({isCurrentOrganisation, organisationId, onClickSetOrganisationId}: ActionButtonProps) => {

  const handleOnClick = () => {
    onClickSetOrganisationId(organisationId)
  }
  
  return(
    <>
      {isCurrentOrganisation ?
        <Box sx={theme=>({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing(1),
        })}>
          <CheckCircleIcon fontSize="small" color="success"/>
          <Typography align="center" sx={{ fontWeight: "400" }}>
            Current
          </Typography>
        </Box> :
        <Button variant="outlined" onClick={handleOnClick} sx={{
          width: "82px"
        }}>
          Switch
        </Button>
      }
    </>
  )
}
  
export default SwitchOrganisationButton