import React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  FormHelperTextProps,
  Input,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  InputAddonProps,
  InputLeftAddon,
  InputRightAddon,
  InputGroupProps,
} from "@chakra-ui/react";
import { useThemeMode } from "@providers/hooks";

export interface PrimaryInputProps extends InputProps {
  inputRef?: React.LegacyRef<HTMLInputElement>;
  label?: string;
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  inputGroupProps?: InputGroupProps;
  value?: string;
  error?: boolean;
  bottomTextOnError?: boolean;
  bottomText?: string | React.ReactElement;
  setValue?: (value: string) => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftComponentProps?: InputElementProps;
  rightComponentProps?: InputElementProps;
  leftAddonProps?: InputAddonProps;
  rightAddonProps?: InputAddonProps;
  errorTextProps?: FormErrorMessageProps;
  bottomTextProps?: FormHelperTextProps;
}

export const PrimaryInput: React.FC<PrimaryInputProps> = ({
  inputRef,
  label,
  labelProps,
  // setValue,
  error,
  bottomTextOnError = true,
  bottomText,
  leftComponent,
  rightComponent,
  formControlProps,
  inputGroupProps,
  leftComponentProps,
  rightComponentProps,
  leftAddon,
  rightAddon,
  leftAddonProps,
  rightAddonProps,
  errorTextProps,
  bottomTextProps,
  ...rest
}) => {
  const { colors } = useThemeMode();
  return (
    <FormControl
      isInvalid={error}
      isRequired={rest.isRequired}
      isReadOnly={rest.isReadOnly}
      {...formControlProps}
    >
      {Boolean(label) && <FormLabel {...labelProps}>{label}</FormLabel>}
      <InputGroup size={rest.size} {...inputGroupProps}>
        {/* left component goes here  */}
        {Boolean(leftComponent) && (
          <InputLeftElement
            mx="5px"
            my="3px"
            color={colors.black_3}
            {...leftComponentProps}
          >
            {leftComponent}
          </InputLeftElement>
        )}

        {Boolean(leftAddon) && (
          <InputLeftAddon {...leftAddonProps}>{leftAddon}</InputLeftAddon>
        )}

        <Input
          ref={inputRef}
          className=""
          isInvalid={error}
          size={"lg"}
          borderRadius="8px"
          isRequired={rest.isRequired}
          borderColor={colors.black_4}
          focusBorderColor={colors.primary}
          errorBorderColor={colors.danger}
          backgroundColor={colors.white}
          _focusVisible={{
            boxShadow: "none",
            borderColor: colors.primary,
            ...rest?._focusVisible,
          }}
          {...rest}
        />

        {Boolean(rightAddon) && (
          <InputRightAddon {...rightAddonProps}>{rightAddon}</InputRightAddon>
        )}

        {/* right component goes here  */}
        {Boolean(rightComponent) && (
          <InputRightElement
            mx="5px"
            my="3px"
            color={colors.black_3}
            {...rightComponentProps}
          >
            {rightComponent}
          </InputRightElement>
        )}
      </InputGroup>
      {Boolean(error && bottomText) && (
        <FormErrorMessage color="danger" fontSize="14px" {...errorTextProps}>
          {bottomText}
        </FormErrorMessage>
      )}
      {Boolean(!bottomTextOnError && !error && bottomText) && (
        <FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>
      )}
    </FormControl>
  );
};
