"use client"
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { LocalGroceryStore, Category, Web, ShoppingCartCheckout, People } from "../atoms/icons";

type IProps = {
  open: boolean;
}

const NAVIGATION_ITEMS = [
  { name: "Orders", icon: <ShoppingCartCheckout />, to: "/orders" },
  { name: "Categories", icon: <Category />, to: "/categories" },
  { name: "Products", icon: <LocalGroceryStore />, to: "/products" },
  { name: "Extra Option Categories", icon: <Web />, to: "/extra-option-categories" },
  { name: "Extra Options", icon: <Web />, to: "/extra-options" },
  { name: "Sites", icon: <Web />, to: "/sites" },
  { name: "Users", icon: <People />, to: "/users" },
]


export const NavigationItems = ({open}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <React.Fragment>
      {
        NAVIGATION_ITEMS.map(item => (
          <ListItem
            onClick={() => router.push(item.to)}
            key={item.name} disablePadding
            sx={{ display: 'block' }}
            className={pathname === item.to ? "ActiveLink" : ""}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={pathname?.startsWith(item.to)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))
      }
    </React.Fragment>
  )
}