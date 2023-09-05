import { Divider, Flex, Text } from "@chakra-ui/react";
import { Color, CopyTextButton } from "@shared/ui-kit";
import { useDexContext } from "@dex/hooks";
import { useFormContext } from "react-hook-form";
import { CreateDAOMemberOperationForm, CreateDAOProposalContext } from "../types";
import { useOutletContext } from "react-router-dom";

export function DAODeleteMemberReviewForm() {
  const { getValues } = useFormContext<CreateDAOMemberOperationForm>();
  const { membersCount } = useOutletContext<CreateDAOProposalContext>();
  const { wallet } = useDexContext(({ wallet }) => ({ wallet }));
  const walletId = wallet.savedPairingData?.accountIds[0] ?? "";
  const { newThreshold = 0, memberAddress = "", title = "", description = "" } = getValues();
  function handleCopyMemberId() {
    console.log("copy member id");
  }

  return (
    <Flex direction="column" gap="1.4rem">
      <Flex direction="column" gap="2">
        <Text textStyle="p small medium">Title</Text>
        <Text textStyle="p small regular" color={Color.Neutral._700}>
          {title}
        </Text>
      </Flex>
      <Divider />
      <Flex direction="column" gap="2">
        <Text textStyle="p small medium">Description</Text>
        <Text textStyle="p small regular" color={Color.Neutral._700}>
          {description}
        </Text>
      </Flex>
      <Divider />
      <Flex direction="column" gap="2">
        <Text textStyle="p small medium">Remove Member</Text>
        <Flex gap="2" alignItems="center">
          <Text textStyle="p small regular" color={Color.Neutral._700}>
            {memberAddress}
          </Text>
          <CopyTextButton onClick={handleCopyMemberId} iconSize="17" />
        </Flex>
      </Flex>
      <Divider />
      <Flex direction="row" gap="2" alignItems="center">
        <Text textStyle="p small medium">Proposal threshold confirmation changes to</Text>
        <Text textStyle="p medium semibold">{`${newThreshold} / ${membersCount - 1} members`}</Text>
      </Flex>
      <Divider />
      <Flex direction="column" gap="2">
        <Text textStyle="p small medium">Submitted By</Text>
        <Flex gap="2" alignItems="center">
          <Text textStyle="p small regular" color={Color.Neutral._700}>
            {walletId}
          </Text>
          <CopyTextButton onClick={handleCopyMemberId} iconSize="17" />
        </Flex>
      </Flex>
    </Flex>
  );
}