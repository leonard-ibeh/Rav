import { useModal } from "mui-modal-provider";
import { Box, Image, Text, Center, Flex } from "@chakra-ui/react";
import { AddImageDialog, AddImageDialogProps } from "./addImage";

export interface ImageUploaderProps {
  canEdit?: boolean;
  isLoading?: boolean;
  folder?: string;
  addImageModalProps?: AddImageDialogProps;
  onUploadImage?: (upload: any) => void;
  onUploadClose?: () => void;
}

export const ImageUploader = ({
  folder,
  addImageModalProps,
  onUploadImage = () => {},
  onUploadClose = () => {},
}: ImageUploaderProps) => {
  const { showModal } = useModal();

  const editImage = () => {
    const modal: any = showModal(AddImageDialog, {
      isOpen: true,
      useButton: false,
      folder,
      title: "Update Image",
      ...addImageModalProps,
      onClose: () => {
        modal?.update({ isOpen: false });
        onUploadClose();
      },
      onSuccess: (data) => {
        if (data && data.length) {
          onUploadImage(data[0]);
        }
      },
    });
  };
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontSize="14px" color="black_2">
          Add Picture
        </Text>
        <Text fontSize="14px" color="black_2">
          1 picture per service
        </Text>
      </Flex>
      <Box
        border="1px solid #D3D3D4"
        rounded="8px"
        py="38px"
        onClick={() => editImage()}
        // isLoading={isLoading}
      >
        <Center width="100%" flexDir="column">
          <Image
            boxSize="40px"
            borderRadius="100%"
            src="/assets/icons/ImagesIcon.svg"
          />
          <Text fontSize="14px" color="black_2">
            Upload Image Showing your service
          </Text>
        </Center>
      </Box>
    </Box>
  );
};
