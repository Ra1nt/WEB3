const hre = require("hardhat");

async function main() {
    const ethers = hre.ethers;
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);

    const NFT = await ethers.getContractFactory("NFTCollection");
    const nft = await NFT.deploy(); // Ethers v6 不需要 .deployed()
    console.log("NFTCollection deployed to:", nft.target);

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const market = await Marketplace.deploy();
    console.log("Marketplace deployed to:", market.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
