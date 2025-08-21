import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "./config";

import nftAbi from "./abis/NFTCollection.json";
import marketAbi from "./abis/Marketplace.json";

// 组件
import Navbar from "./components/Navbar";
import MintNFT from "./components/MintNFT";
import MyNFTs from "./components/MyNFTs";
import Marketplace from "./components/Marketplace";
import MyListings from "./components/MyListings";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [myNFTs, setMyNFTs] = useState([]);
  const [activeListings, setActiveListings] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert("请先安装 MetaMask");
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const signer = await provider.getSigner();
      const nft = new ethers.Contract(NFT_COLLECTION_ADDRESS, nftAbi.abi, signer);
      const market = new ethers.Contract(MARKETPLACE_ADDRESS, marketAbi.abi, signer);

      setNftContract(nft);
      setMarketContract(market);

      await fetchMyNFTs(nft, accounts[0]);
      await fetchListings(market);
    } catch (err) {
      console.error("连接钱包失败:", err);
      alert("连接钱包失败，请查看控制台日志");
    }
  };

  const fetchMyNFTs = async (contract = nftContract, userAccount = account) => {
    if (!contract || !userAccount) return;
    try {
      const total = await contract.nextTokenId(); // NFTCollection 合约使用 nextTokenId
      const items = [];
      for (let i = 1; i <= total; i++) {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === userAccount.toLowerCase()) {
          const uri = await contract.tokenURI(i);
          items.push({ tokenId: i, uri });
        }
      }
      setMyNFTs(items);
    } catch (err) {
      console.error("获取我的 NFT 失败:", err);
    }
  };

  const fetchListings = async (contract = marketContract) => {
    if (!contract) return;
    try {
      const [ids, items] = await contract.getActiveListings();
      const listingData = ids.map((id, idx) => ({
        listingId: id,
        tokenId: items[idx].tokenId,
        price: ethers.formatEther(items[idx].price),
        nft: items[idx].nft
      }));
      setActiveListings(listingData);
    } catch (err) {
      console.error("获取市场列表失败:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Navbar account={account} connectWallet={connectWallet} />

      <MintNFT account={account} nftContract={nftContract} fetchMyNFTs={fetchMyNFTs} />

      <MyNFTs myNFTs={myNFTs} />

      <Marketplace 
        marketContract={marketContract} 
        activeListings={activeListings} 
        fetchListings={fetchListings} 
      />

      <MyListings 
        marketContract={marketContract} 
        account={account} 
        fetchListings={fetchListings} 
      />
    </div>
  );
}

export default App;
