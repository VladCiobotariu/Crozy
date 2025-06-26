import { Breadcrumbs, Typography } from "@mui/joy";
import Link from "next/link";

export interface IBreadcrumb {
  title: string | undefined;
  link: string;
}

type BreadcrumbProps = {
  breadcrumbs: IBreadcrumb[];
  currentObjectTitle: string | undefined;
};

const Breadcrumb = ({ breadcrumbs, currentObjectTitle }: BreadcrumbProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumbs" sx={theme=>({
        width: "100%",
        [theme.breakpoints.between('sm','md')]: {
          width: "fit-content",
        },
        padding: 0,
        pb: 4,
        [theme.breakpoints.down('md')]: {
          pb: 2,
        },
    })}>
      {breadcrumbs.map( value => (
        <Link key={value.link} href={value.link}>
            {value.title}
        </Link>
      ))}
      <Typography>{currentObjectTitle}</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
