import { ethers } from "ethers";

export async function transferToken({
  tokenAddress,
  amount,
  rpcUrl
}: {
  tokenAddress: string;
  amount: string; // human-readable
  rpcUrl: string;
}) {
  const privateKey = process.env.SPENDER_PRIVATE_KEY!;
  const recipient = process.env.SPENDER_ADDRESS!;

  if (!privateKey || !recipient) {
    throw new Error("Missing SPENDER_PRIVATE_KEY or SPENDER_ADDRESS in .env");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const erc20Abi = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function decimals() view returns (uint8)"
  ];

  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

  const decimals: number = await tokenContract.decimals();
  const value = ethers.parseUnits(amount, decimals);

  const tx = await tokenContract.transfer(recipient, value);
  await tx.wait();
  return tx;
}