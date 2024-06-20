import { useRef, useState } from "react";
import {
  DropzoneFile,
  PrimaryButton,
  PrimaryDropzone,
  PrimaryDropzoneProp,
} from "..";
import Cropper, { ReactCropperElement, ReactCropperProps } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { HStack } from "@chakra-ui/react";

export interface CropDropzoneImageProps {
  onCropped: (
    name: string,
    image: string,
    blob: Blob,
    uncroppedFile: File
  ) => void;
  onClear?: () => void;
  disabled?: boolean;
  dropzoneProps?: PrimaryDropzoneProp;
  cropperProps?: ReactCropperProps;
}
export const CropDropzoneImage: React.FC<CropDropzoneImageProps> = ({
  onCropped = () => {},
  onClear = () => {},
  disabled,
  dropzoneProps,
  cropperProps,
}) => {
  const [cropper, setCropper] = useState<Cropper>();
  const [file, setFile] = useState<DropzoneFile>();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [cropped, setCropped] = useState<string>();
  const cropperRef = useRef<HTMLImageElement | ReactCropperElement>(null);

  const onCropperInit = (initCropper: Cropper) => {
    setCropper(initCropper);
  };

  const handleImageChange = (files: DropzoneFile[]) => {
    const reader = new FileReader();
    const file = files[0];
    setFile(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file.data);
    }
  };

  const handleCrop = () => {
    if (file && cropper && cropper) {
      if (typeof cropper?.getCroppedCanvas() === "undefined") {
        return;
      }

      const croppedCanvas = cropper.getCroppedCanvas();

      croppedCanvas.toBlob(
        (blob) => {
          if (blob) {
            const croppedImage = URL.createObjectURL(blob);
            // Do something with the cropped image
            // console.log(croppedImage);

            onCropped(file?.name, croppedImage, blob, file.data);
            setCropped(croppedImage);
          }
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const undoCrop = () => {
    setCropped(undefined);
    onClear();
  };
  const clearImage = () => {
    setImage(null);
    setCropped(undefined);
    setFile(undefined);
    onClear();
  };

  return (
    <div className="w-100">
      {!image ? (
        <PrimaryDropzone
          onChange={(files) => handleImageChange(files)}
          dropzoneText="Drag 'n' drop your images here, or click to select files"
          dropzoneParentProps={{
            className: "d-flex justify-content-center align-items-center",
            style: { minHeight: "200px" },
          }}
          dropzoneOptions={{
            accept: { "image/*": [] },
            multiple: false,
            disabled,
          }}
          {...dropzoneProps}
        />
      ) : (
        <div>
          <div className="d-flex flex-column justify-content-center">
            {Boolean(image && !cropped) && (
              <Cropper
                ref={cropperRef}
                src={image as string}
                style={{ width: "100%" }}
                initialAspectRatio={1}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                guides={false}
                checkOrientation={false}
                onInitialized={onCropperInit}
                {...cropperProps}
              />
            )}

            {Boolean(image && cropped) && (
              <img src={cropped} className="img-fluid" alt="cropped" />
            )}
          </div>

          <HStack justifyItems={"stretch"} className="pt-3">
            {Boolean(image && !cropped) && (
              <PrimaryButton
                variant="outline"
                size={"lg"}
                onClick={handleCrop}
                isDisabled={disabled}
              >
                Crop Image
              </PrimaryButton>
            )}

            {Boolean(image && cropped) && (
              <PrimaryButton
                variant="outline"
                size={"lg"}
                colorScheme="cyan"
                onClick={undoCrop}
                isDisabled={disabled}
              >
                Undo Crop
              </PrimaryButton>
            )}
            <PrimaryButton
              variant="outline"
              size={"lg"}
              colorScheme={"red"}
              onClick={clearImage}
              isDisabled={disabled}
            >
              Clear Image
            </PrimaryButton>
          </HStack>
        </div>
      )}
    </div>
  );
};
