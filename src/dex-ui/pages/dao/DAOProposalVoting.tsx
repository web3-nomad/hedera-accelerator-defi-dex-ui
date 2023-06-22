import { Text, Flex } from "@chakra-ui/react";
import { Color, ProgressBar, PeopleIcon } from "@dex-ui-components";
import { Proposal } from "@dex-ui/hooks";
import { getFormattedEndTime } from "@utils";
import { DAO, DAOType } from "@services";

interface DAOProposalVotingProps {
  proposal: Proposal;
  dao: DAO;
}

export const DAOProposalVoting = (props: DAOProposalVotingProps) => {
  const { proposal, dao } = props;
  const isMultiSig = dao.type === DAOType.MultiSig;
  let turnout = 0;
  if (isMultiSig && dao.threshold) {
    turnout = Math.round((proposal.approvalCount / dao.threshold) * 100);
  }
  const votingEndTime = proposal.timestamp ? getFormattedEndTime(proposal.timestamp) : "";

  return (
    <Flex direction="column" gap={2} padding={3} backgroundColor={Color.Grey_Blue._50}>
      <Flex justifyContent="space-between" alignItems="flex-start">
        {isMultiSig ? (
          <Flex alignItems="center" gap={2}>
            <PeopleIcon boxSize={5} />
            <Text textStyle="p medium regular">
              {proposal.approvalCount} / {dao.threshold}
            </Text>
          </Flex>
        ) : (
          <Flex gap={2} alignItems="flex-start">
            <Flex direction="column" alignItems="flex-start">
              <Text textStyle="p xsmall regular" color={Color.Grey_Blue._600} textAlign="start">
                Voting end time
              </Text>
              <Text textStyle="p xsmall semibold" color={Color.Grey_Blue._600} textAlign="start">
                {votingEndTime}
              </Text>
            </Flex>
            <Flex border={`1px solid ${Color.Success._600}`} paddingX={3} borderRadius={4} textAlign="center">
              <Text
                textStyle="p small medium"
                color={Color.Success._600}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                Turnout: {`${turnout}%`}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      {isMultiSig && (
        <ProgressBar height="8px" borderRadius="4px" value={turnout} progressBarColor={Color.Grey_Blue._300} />
      )}
    </Flex>
  );
};
