import { BigNumber } from "bignumber.js";
import { HashConnectSigner } from "hashconnect/dist/esm/provider/signer";
import { ethers } from "ethers";
import { AccountId, TokenId, ContractId, ContractExecuteTransaction, TransactionResponse } from "@hashgraph/sdk";
import { BaseDAOContractFunctions } from "./type";
import { checkTransactionResponseForError } from "../utils";
import { Contracts } from "../../constants";
import NFTDAOFactoryJSON from "../../abi/NFTDAOFactory.json";

const Gas = 9000000;

interface SendCreateNFTDAOTransactionParams {
  name: string;
  logoUrl: string;
  isPrivate: boolean;
  description: string;
  daoLinks: string[];
  tokenId: string;
  treasuryWalletAccountId: string;
  quorum: number;
  votingDuration: number;
  lockingDuration: number;
  signer: HashConnectSigner;
}

async function sendCreateNFTDAOTransaction(params: SendCreateNFTDAOTransactionParams): Promise<TransactionResponse> {
  const {
    name,
    logoUrl,
    treasuryWalletAccountId,
    tokenId,
    quorum,
    lockingDuration,
    votingDuration,
    isPrivate,
    description,
    daoLinks,
    signer,
  } = params;
  const nftDAOFactoryContractId = ContractId.fromString(Contracts.NFTDAOFactory.ProxyId);
  const daoAdminAddress = AccountId.fromString(treasuryWalletAccountId).toSolidityAddress();
  const tokenAddress = TokenId.fromString(tokenId).toSolidityAddress();
  const preciseQuorum = BigNumber(quorum);
  const preciseLockingDuration = BigNumber(lockingDuration);
  const preciseVotingDuration = BigNumber(votingDuration);

  const createDaoParams: any[] = [
    daoAdminAddress,
    name,
    logoUrl,
    tokenAddress,
    preciseQuorum.toNumber(),
    preciseLockingDuration.toNumber(),
    preciseVotingDuration.toNumber(),
    isPrivate,
    description,
    daoLinks,
  ];
  const contractInterface = new ethers.utils.Interface(NFTDAOFactoryJSON.abi);
  const data = contractInterface.encodeFunctionData(BaseDAOContractFunctions.CreateDAO, [createDaoParams]);
  const createNFTDAOTransaction = await new ContractExecuteTransaction()
    .setContractId(nftDAOFactoryContractId)
    .setFunctionParameters(ethers.utils.arrayify(data))
    .setGas(Gas)
    .freezeWithSigner(signer);
  const createGovernanceDAOResponse = await createNFTDAOTransaction.executeWithSigner(signer);
  checkTransactionResponseForError(createGovernanceDAOResponse, BaseDAOContractFunctions.CreateDAO);
  return createGovernanceDAOResponse;
}

export { sendCreateNFTDAOTransaction };
