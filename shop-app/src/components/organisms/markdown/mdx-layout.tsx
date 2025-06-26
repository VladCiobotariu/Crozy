import { Box } from "@mui/joy";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <Box sx={{ 
    width: {
      xl: "80%",
      lg: "80%",
      md: "80%",
      sm: "100%",
      xs: "100%",
    }
  }}>{children}</Box>
}