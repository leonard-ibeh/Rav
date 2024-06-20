import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ChakraProviderLoader } from 'providers';
import { Upload, useCreateUploadMutation } from '@stores/upload';
import { resolveApiError } from '@utils/errorHandling';
import { PrimaryDialog, PrimaryDialogProps } from '@components/dialog';
import { DropzoneFile } from '@components/inputs/dropzone';
import { DropzoneBaseUpload } from './dropzoneUploader';
import { CropDropzoneImage, CropDropzoneImageProps } from './cropDropzoneImage';

export interface AddImageDialogProps extends PrimaryDialogProps {
  useButton?: boolean;
  folder?: string;
  children?: string | React.ReactElement,
  buttonProps?: ButtonProps,
  getDropzoneFiles?: (files: DropzoneFile[]) => void,
  getDropzoneUploads?: (uploads: DropzoneBaseUpload[]) => void,
  onSuccess?: (data?: Upload[]) => void,
  cropDropzoneImageProps?: CropDropzoneImageProps;
  cropperProps?: CropDropzoneImageProps['cropperProps'],
  dropzoneProps?: CropDropzoneImageProps['dropzoneProps'],

}

export const AddImageDialog: React.FC<AddImageDialogProps> = ({
  folder = 'cropped',
  useButton = true,
  children,
  buttonProps,
  onClose = () => { },
  onSuccess = () => { },
  // getDropzoneFiles = () => { },
  // getDropzoneUploads = () => { },
  cropDropzoneImageProps,
  dropzoneProps,
  cropperProps,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const toast = useToast({ position: "top-right" });
  const [file, setFile] = useState<{ blob: Blob, file: File, name: string, image: string }>();
  const [requestUpload, { isLoading }] = useCreateUploadMutation();


  const initRequest = () => {
    if (file) {
      const form = new FormData();
      form.append('folder', folder);
      form.append('files[]', file.blob)

      requestUpload(form).unwrap().then((res) => {
        // console.log(res);
        toast({ title: "Image Uploaded Successfully", description: res?.response, status: "success" });
        initOnClose((res?.data as Upload[]));
      }).catch((error) => {
        // console.log(error);
        toast({
          title: "Request Failed",
          description: resolveApiError(error),
          status: "error"
        })
      });
    }
  }

  const initOnClose = (data?: Upload[]) => {
    setShow(false)
    onClose();
    if (data) {
      onSuccess(data)
    }
  }


  // console.log(errors)

  return (
    <ChakraProviderLoader>
      {useButton && (
        <Button onClick={() => setShow(true)} {...buttonProps}>
          {children}
        </Button>
      )}
      <PrimaryDialog
        title={"Add Image"}
        size={"xl"}
        proceedButtonProps={{ colorScheme: "teal", isDisabled: !file }}
        proceedButtonDefaultChild={(file ? "Upload Image" : "Add Image")}
        isOpen={rest?.isOpen ? rest?.isOpen : show}
        onProceed={initRequest}
        onClose={initOnClose}
        isProceeding={isLoading}
        modalBodyProps={{ px: 2}}
        {...rest}
      >
        <div className="row g-2">
          <div className="col-12">
            <CropDropzoneImage
              onCropped={(name, image, blob, file) => setFile({ name, blob, file, image })}
              onClear={() => setFile(undefined)}
              disabled={isLoading}
              dropzoneProps={dropzoneProps}
              cropperProps={cropperProps}
              {...cropDropzoneImageProps}
            />
          </div>
        </div>
      </PrimaryDialog>
    </ChakraProviderLoader>
  );
};


