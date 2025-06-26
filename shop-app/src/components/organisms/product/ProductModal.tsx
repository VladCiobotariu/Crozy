import ProductTemplate from "@moleculas/product-template/ProductTemplateModal";
import { Modal, ModalClose, ModalDialog, useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Transition } from "react-transition-group";
import { ProductDetails } from "@/providers/BasketProvider";

type ProductModalProps = {
  product: ProductDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProductModal = ({ open, onOpenChange, product }: ProductModalProps) => {
  const theme = useTheme();

  const modalLayout = useMediaQuery(theme.breakpoints.down("sm")) ? "fullscreen" : "center";

  const onProductAddedToBasket = () => {
    onOpenChange(false);
  };

  /**
   * if we are not using this, it would give a warning: findDOMNode is deprecated in StrictMode
   * Solved with: https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
   */
  const nodeRef = React.useRef(null);

  return (
    <React.Fragment>
      <Transition in={open} timeout={400} nodeRef={nodeRef}>
        {(state: string) => (
          <Modal
            onClose={() => onOpenChange(false)}
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              layout={modalLayout}
              sx={theme => ({
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                boxShadow: theme.shadow.md,
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(4),
                [theme.breakpoints.down("sm")]: {
                  padding: theme.spacing(4),
                  pb: 0,
                  overflow: "auto",
                  maxHeight: "100vh",
                },
                [theme.breakpoints.between("sm", "md")]: {
                  padding: theme.spacing(3),
                  overflow: "auto",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                },
                boxSizing: "border-box",
                [theme.breakpoints.up("sm")]: {
                  borderRadius: "20px",
                  width: "930px",
                },
              })}
              variant="outlined"
              role="alertdialog"
            >
              <ModalClose variant="plain" sx={{ m: 1, zIndex: 5 }} />
              <ProductTemplate product={product} onProductAddedToBasket={onProductAddedToBasket} />
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
};

export default ProductModal;
