import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {Button} from "../../atoms";
import WarningIcon from '@mui/icons-material/Warning';
import {useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type DeleteModalProps = {
    open: boolean;
    handleClose: () => void;
    onDeleteConfirm: () => void;
    entity: string;
    customTitle?: string;
    customText?: string;
}

const DeleteModal = ({open, handleClose, onDeleteConfirm, entity, customTitle, customText}: DeleteModalProps) => {

    const theme = useTheme();
    const handleConfirm = () => {
        onDeleteConfirm();
        handleClose();
    }

    const modalStyle = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        backgroundColor: "background.paper",
        border: "1px solid rgb(205, 215, 225)",
        borderRadius: theme.spacing(1),
        boxShadow: 10,
        p: 4,
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        }
    };

    const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));
    const sizeForButtons: "small" | "medium" = isSmallSize ? "small" : "medium";

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Box sx={{textAlign: "center"}}>
                        <WarningIcon sx={{color: "red"}}/>
                    </Box>

                    <Typography id="transition-modal-title" variant="h6" component="h2"
                                sx={{textAlign: "center", mb: theme.spacing(1)}}>
                        {customTitle ? customTitle : 
                            <>Are you sure you want to delete this {entity}?</>}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{textAlign: "center", mb: theme.spacing(1)}}>
                        {customText ? customText : 
                            <>This will delete the {entity} permanently. You cannot undo this action.</>}
                    </Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Button
                            title="No, cancel"
                            onClick={handleClose}
                            variant="outlined"
                            color="inherit"
                            size={sizeForButtons as "small" | "medium" | "large"}
                        />
                        <Button
                            title="Yes, I am sure"
                            onClick={handleConfirm}
                            color="error"
                            size={sizeForButtons as "small" | "medium" | "large"}/>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default DeleteModal;