import Badge from "@mui/joy/Badge";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { useBasket } from "../../../providers";
import MenuItem from "@mui/joy/MenuItem";
import ShoppingBasketMenuItem from "./ShoppingBasketMenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Link from "next/link";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { MenuList, styled, useTheme } from "@mui/joy";
import CSS from "csstype";
import { Transition, TransitionStatus } from "react-transition-group";
import { ClickAwayListener, Popper } from "@mui/material";

const effectDuration = 150;
const timeoutBeforeEffect = 200;
const defaultStyle = {
  transition: `transform ${effectDuration}ms ease-in-out`,
  transform: "scale(1)",
};

const transitionStyles: Partial<Record<TransitionStatus, CSS.Properties>> = {
  entering: { transform: "scale(1)" },
  entered: { transform: "scale(1)" },
  exiting: { transform: "scale(1)" },
  exited: { transform: "scale(1.6)" },
};

const Popup = styled(Popper)({
  zIndex: 10000,
});

type IProps = {};

const ShoppingBasketIcon = ({}: IProps) => {
  const theme = useTheme();
  const { items, addListener, removeListener } = useBasket();
  const itemsCount = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const [isOverflow, setIsOverflow] = useState<boolean>(false)

  const [open, setOpen] = React.useState(false);
  const handleClick = (event: any) => {
    setOpen(true);
  };

  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        setInProp(false);
        const timer = setTimeout(() => {
          setInProp(true);
        }, effectDuration);
      }, timeoutBeforeEffect);
    };
    addListener(listener);
    return () => removeListener(listener);
  }, []);

  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setOpen(false);
    setIsAtBottom(false)
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === "Escape") {
      if (buttonRef.current) {
        buttonRef.current?.focus();
      }
      setOpen(false);
    }
  };

  const setShadowPopover = (ref: HTMLDivElement) => {
    const onScroll = () => {
      if (ref) {
        const { scrollTop, scrollHeight, clientHeight } = ref;      
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 30;
  
        if (isNearBottom) {
          setIsAtBottom(true)
        } else {
          setIsAtBottom(false)
        }
      }
    };
    if(ref){
      if (ref.scrollHeight - ref.clientHeight >= 30) {
        setIsOverflow(true)
      } else{
        setIsOverflow(false)
      }
      ref.addEventListener("scroll", onScroll);
      // Clean-up
      return () => {
        ref.removeEventListener("scroll", onScroll);
      };
    }
  }

  return (
    <Box>
      <IconButton
        variant="plain"
        onClick={handleClick}
        ref={buttonRef}
        aria-controls={"basket-popup"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="neutral"
      >
        <Transition nodeRef={nodeRef} in={inProp} timeout={effectDuration}>
          {(state: TransitionStatus) => (
            <Badge
              badgeContent={itemsCount}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <Typography fontSize="xl">🛒</Typography>
            </Badge>
          )}
        </Transition>
      </IconButton>
      <Popup role={undefined} id="basket-popup" open={open} anchorEl={buttonRef.current}>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList variant="outlined" onKeyDown={handleListKeyDown} sx={{ boxShadow: "md" }}>
            <Box ref={setShadowPopover} style={({
              maxHeight: "40vh",
              overflow: "auto"
            })}>
              {items.map(item => (
                <React.Fragment key={`cart-fragment-${item.guid}`}>
                  <MenuItem sx={{ padding: theme.spacing(1, 1) }}>
                    <ShoppingBasketMenuItem item={item} />
                  </MenuItem>
                  <ListDivider key={`divider-item-${item.product.id}`} />
                </React.Fragment>
              ))}
            </Box>

            <MenuItem key="basket-view" sx={{
              boxShadow: isOverflow && !isAtBottom ? "0px -10px 15px rgba(0, 0, 0, 0.1)" : "",
              display: "flex", 
              justifyContent: "end"
            }}>
              {itemsCount > 0 ? (
                <Link href="/shopping-cart" style={{ textDecoration: "none" }}>
                  <Button onClick={handleClose}> Vezi detalii cos</Button>
                </Link>
              ) : (
                <Link href="/shopping-cart" onClick={handleClose}>
                  <Typography key="empty-basket-button">Cosul este gol</Typography>
                </Link>
              )}
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </Box>
  );
};

export default ShoppingBasketIcon;
