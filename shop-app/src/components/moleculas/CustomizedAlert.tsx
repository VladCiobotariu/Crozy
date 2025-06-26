import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { AlertState, useAlert } from "@/providers/AlertProvider";
import { Box } from "@mui/system";

type CustomizedAlertProps = AlertState & {}

const CustomizedAlert = ({ type, title, paragraph }: CustomizedAlertProps) => {
  const { clearAlert } = useAlert();
  const icon: React.ReactElement = (() => {
    switch (type) {
      case "neutral":
        return <InfoIcon />;
      case "warning":
        return <WarningIcon />;
      case "danger":
        return <ReportIcon />;
      case "success":
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  })();

  return (
    <Box
      sx={theme => ({
        zIndex: "99999",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        top: {
          xs: "89px",
          sm: "89px",
          md: "113px",
          lg: "113px",
          xl: "113px",
        },
        [theme.breakpoints.between("sm", "lg")]: {
          pr: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          maxWidth: "1200px",
          width: "100%",
          justifyContent: "flex-end",
        },
      })}
    >
      <Alert
        key={title}
        sx={{
          maxWidth: "400px",
          width: "fit-content",
          alignItems: "flex-start",
        }}
        startDecorator={icon}
        variant="soft"
        color={type}
        endDecorator={
          <IconButton onClick={clearAlert} variant="soft" color={type}>
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
          <div>{title}</div>
          <Typography level="body-sm" color={type}>
            {paragraph}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
};

export default CustomizedAlert;
