import { DeliveryAdminTheme, IColors } from "../models";
import { Palette } from "@mui/icons-material";

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    name: string;
    deliveryAdmin: DeliveryAdminTheme;
  }

  interface ThemeOptions {
    name: string;
    deliveryAdmin?: DeliveryAdminTheme;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    colors: IColors;
  }
  interface PaletteOptions {
    colors: IColors;
  }
}
