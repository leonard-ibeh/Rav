import {
  Avatar,
  AvatarProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { useModal } from "mui-modal-provider";
import { MdCameraAlt } from "react-icons/md";
import { Upload } from "@stores/upload";
import { AddImageDialog, AddImageDialogProps } from "./addImage";

export interface AvatarUploaderProps extends AvatarProps {
  canEdit?: boolean;
  isLoading?: boolean;
  folder?: string;
  iconButtonProps?: IconButtonProps;
  addImageModalProps?: AddImageDialogProps;
  onUploadImage?: (upload: Upload) => void;
  onUploadClose?: () => void;
}
export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  canEdit,
  isLoading,
  folder,
  iconButtonProps,
  addImageModalProps,
  onUploadImage = () => {},
  onUploadClose = () => {},
  ...rest
}) => {
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
    <div>
      <Avatar backgroundColor="#319795" color="#fff" {...rest} />
      {Boolean(canEdit) && (
        <IconButton
          icon={<MdCameraAlt />}
          fontSize={"18px"}
          colorScheme="gray"
          position="absolute"
          marginLeft={"-20px"}
          marginTop={"-5px"}
          zIndex={9}
          width={""}
          borderRadius={"full"}
          aria-label=""
          onClick={() => editImage()}
          isLoading={isLoading}
          {...iconButtonProps}
        />
      )}
    </div>
  );
};
