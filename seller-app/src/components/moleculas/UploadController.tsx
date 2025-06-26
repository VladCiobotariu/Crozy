import React, { useRef, useState } from "react";
import { Box, Button } from "../atoms";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Typography, styled } from "@mui/material";
import { useAddImageMutation } from "../../generated/graphql";
import ImageDisplay from "../atoms/imageDisplay/ImageDisplay";
import DeleteModal from "./modals/DeleteModal";

type UploadControllerProps = {
  setFile: (_: any) => void;
  imageFile: string | null | undefined;
  imageUrl: string | null | undefined;
};

const UploadContainer = styled("div")(() => ({
  display: "flex",
  gap: 20,
  width: "100%",
}));

const CloseContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  gap: 5,
  width: "100%",
}));

export const UploadController = ({ setFile, imageFile, imageUrl }: UploadControllerProps) => {

  const [imageUrlUploaded, setImageUrlUploaded] = useState(imageUrl);
  const [open, setOpen] = useState<boolean>(false);

  const [addImage, { loading, error }] = useAddImageMutation({
    context: { headers: { "GraphQL-preflight": 1 } },
  });

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.validity.valid && e?.target?.files) {
      const file = e?.target?.files[0];
      if(file) {
        const fileResponse = await addImage({ variables: { file } });
        if (fileResponse.data?.addImage?.image?.name) {
          setImageUrlUploaded(fileResponse.data?.addImage?.image?.url);
          setFile(fileResponse.data?.addImage?.image?.name);
        }
      }
    }
  }
  const uploadRef = useRef<any>(null);
  const titleForUploadImageBox: string = imageFile ? "Replace Image" : "Upload Image";

  const handleConfirmDelete = () => {
    setFile(null);
    setImageUrlUploaded(undefined);
    uploadRef.current.value = ""; 
  }

  const toggleModal = () => {
    if(!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <UploadContainer>
      <DeleteModal open={open} handleClose={toggleModal} onDeleteConfirm={handleConfirmDelete} entity="image"/>
      <Box sx={{width: "100%"}}>
        {imageUrlUploaded && (
          <ImageDisplay 
            src={imageUrlUploaded}
            widthHeightForImage={100}
            usePopover={true}
            widthHeightForPopoverImage={200}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          />
        )}
      
          <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
          <Button
            sx={{ width: "20%" }}
            variant={imageFile ? "contained" : "outlined"}
            size="small"
            onClick={() => {
              if (uploadRef && uploadRef.current) {
                uploadRef.current.click();
              }
            }}
            title={titleForUploadImageBox}
          />
          <CloseContainer>
            {imageFile && (
              <>
                <Typography>{imageFile}{" "}</Typography>
                <DeleteOutlineIcon
                  onClick={toggleModal}
                  color={"warning"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "50%",
                    },
                  }}
                />
              </>
            )}
          </CloseContainer>
          <input onChange={onChange} style={{ display: "none" }} type="file" ref={uploadRef} />
          </Box>
      </Box>    
    </UploadContainer>
  );
};
