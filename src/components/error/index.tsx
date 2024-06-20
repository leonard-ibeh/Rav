import {Image, Text, Box, Center} from '@chakra-ui/react'

export const ErrorComponent = () => {
  return (
    <Center width="full">
        <Box
        flexDir="column"
        display="flex"
        alignItems="center"
        >
            <Image src="/assets/icons/errorIcon.svg" alt="error" />
            <Text
            fontSize="16px"
            color="#46494B"
            mt="11px"
            >
            Page not found
            </Text>
        </Box>
    </Center>
  )
}
