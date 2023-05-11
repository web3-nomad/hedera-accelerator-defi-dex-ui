import { Text, Flex, HStack } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { Breadcrumb, ArrowLeftIcon, Color, HashScanLink, HashscanData, Tag } from "@dex-ui-components";
import { DAOType } from "@services";
import { MultiSigTransactionModal } from "../MultiSigTransactionModal";

interface DashboardHeaderProps {
  daoAccountId: string;
  safeAccountId: string;
  name: string;
  type: DAOType;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { daoAccountId, safeAccountId, name, type } = props;

  return (
    <Flex bg={Color.White_02} direction="column" padding="24px 80px 16px">
      <Flex bg={Color.White_02} direction="row" gap="4">
        <Flex bg={Color.White_02} direction="column" gap="2">
          <HStack>
            <Text textStyle="h3 medium">{name}</Text>
            <Tag label={type} />
          </HStack>
          <HStack>
            <HStack>
              <Text textStyle="h4" opacity="0.8">
                DAO ID:
              </Text>
              <HashScanLink id={daoAccountId} type={HashscanData.Account} />
            </HStack>
            <HStack>
              <Text textStyle="h4" opacity="0.8">
                SAFE ID:
              </Text>
              <HashScanLink id={safeAccountId} type={HashscanData.Account} />
            </HStack>
          </HStack>
        </Flex>
        <Flex bg={Color.White_02} flexGrow="1" justifyContent="right" gap="8">
          <Flex height="40px" alignItems="center">
            <Breadcrumb to="/daos" as={ReachLink} label="Back to DAOs" leftIcon={<ArrowLeftIcon />} />
          </Flex>
          <MultiSigTransactionModal
            openDialogButtonText="Send Token"
            daoAccountId={daoAccountId}
            safeAccountId={safeAccountId}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}