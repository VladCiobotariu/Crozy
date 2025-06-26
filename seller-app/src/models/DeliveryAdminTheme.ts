import {IColors} from "./Colors";

export const THEME_NAME = "my-delivery-admin";

export type DeliveryAdminTheme = {
  colors: IColors;
}

export const getDeliveryAdminTheme = (colors: IColors): DeliveryAdminTheme => ({
  colors: colors
})