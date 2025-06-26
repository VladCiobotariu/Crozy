'use client';

import { createTheme } from "@mui/material";
import {
  THEME_NAME,
  IColors,
  DeliveryAdminTheme as DeliveryAdminThemeType,
  getDeliveryAdminTheme,
} from "../../../models";

const colors: IColors = {
  N100: "#FFF",
  N900: "#000",

  R200: "rgb(245, 245, 245)",
  PRIMARY: "#1976d2",

  text: {
    primary: "#000fff", // We can create another file with all colors and use it here
  },
  icon: {
    N100: "#fff",
  },
  borders: {
    N100: "#FFF",
    N200: "#A8A8A8",

    R200: "rgb(224, 224, 227)",
  },
};

const deliveryAdminTheme: DeliveryAdminThemeType = getDeliveryAdminTheme(colors);

export const DeliveryAdminTheme = createTheme({
  name: THEME_NAME,
  deliveryAdmin: deliveryAdminTheme,
  palette: {
    colors,
  },
});
