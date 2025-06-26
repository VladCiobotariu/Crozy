import { Box } from "@mui/joy";
import Link from "next/link";

export type AccountMenuItemProps = {
    displayName: string,
    link: string,
    icon: React.JSX.Element
    handleClick: ()=>void,
}

const AccountMenuItem = ({ displayName, link, icon, handleClick}: AccountMenuItemProps) => {

  return (
    <Link href={link} onClick={handleClick}>
        <Box sx={theme=>({
            flexDirection: "row",
            display: "flex",
            gap: theme.spacing(2),
        })}>
            {icon}
            {displayName}
        </Box>
    </Link>
  );
};

export default AccountMenuItem;
