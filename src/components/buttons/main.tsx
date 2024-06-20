import { useThemeMode } from "@providers/hooks";
import { Button, ButtonProps } from "@chakra-ui/react";

export interface PrimaryButtonProps extends ButtonProps {
  value?: string;
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  value,
  children,
  ...rest
}) => {
  const { colors } = useThemeMode();

  return (
    <Button
      color={colors.white}
      backgroundColor={colors.primary}
      loadingText="Submitting"
      fontSize={"small"}
      size={"lg"}
      height="auto"
      _hover={{ backgroundColor: colors.secondary_dark_shade }}
      _focus={{
        backgroundColor: colors.primary,
        color: colors.white,
      }}
      {...rest}
    >
      {value}
      {children}
    </Button>
  );
};
