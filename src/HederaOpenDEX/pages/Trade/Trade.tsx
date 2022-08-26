import { Box, Center, HStack } from "@chakra-ui/react";
import { Swap } from "../../../components";
import { useHashConnectContext } from "../../../context";

const Trade = (): JSX.Element => {
  const { clearWalletPairings, walletData, network, connectionStatus, installedExtensions, sendSwapTransaction } =
    useHashConnectContext();
  return (
    <HStack>
      <Box margin="1rem">
        <Center>
          <Swap
            sendSwapTransaction={sendSwapTransaction}
            connectionStatus={connectionStatus}
            clearWalletPairings={clearWalletPairings}
            walletData={walletData}
            network={network}
            installedExtensions={installedExtensions}
          />
        </Center>
      </Box>
    </HStack>
  );
};

export { Trade };
