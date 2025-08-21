import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "./config";

// ABI 导入
import nftAbi from "./abis/NFTCollection.json";
import marketAbi from "./abis/Marketplace.json";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
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
      const total = await contract.totalSupply();
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

  const mintNFT = async () => {
    if (!nftContract || !fileUrl) return alert("请先上传图片并输入 URL");
    try {
      const tx = await nftContract.mintNFT(account, fileUrl);
      console.log("交易发送成功:", tx);
      await tx.wait();
      alert("NFT 铸造成功！");
      await fetchMyNFTs();
    } catch (err) {
      console.error("铸造失败:", err);
      alert("铸造失败，请查看控制台日志");
    }
  };

  const listNFT = async () => {
    if (!marketContract || !tokenId || !price) return alert("请输入 tokenId 和价格");
    try {
      const tx = await marketContract.listItem(
        NFT_COLLECTION_ADDRESS,
        tokenId,
        ethers.parseEther(price)
      );
      console.log("上架交易发送成功:", tx);
      await tx.wait();
      alert("NFT 已上架！");
      await fetchListings();
    } catch (err) {
      console.error("上架失败:", err);
      alert("上架失败，请查看控制台日志");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NFT 上传 & 交易 DApp</h1>

      {account ? (
        <p className="text-green-600 mb-4">已连接: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-6"
        >
          连接钱包
        </button>
      )}

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="请输入 NFT 图片 URL"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={mintNFT}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
          >
            铸造 NFT
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="NFT tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="价格 (ETH)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={listNFT}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            上架 NFT
          </button>
        </div>
      </div>

      {/* NFT 可视化展示 */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">我的 NFT</h2>
        <div className="grid grid-cols-3 gap-4">
          {myNFTs.map(nft => (
            <div key={nft.tokenId} className="border p-2 rounded">
              <img src={nft.uri} alt={`NFT ${nft.tokenId}`} className="w-full h-32 object-cover"/>
              <p>Token ID: {nft.tokenId}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2">市场上架 NFT</h2>
        <div className="grid grid-cols-3 gap-4">
          {activeListings.map(item => (
            <div key={item.listingId} className="border p-2 rounded">
              <p>Token ID: {item.tokenId}</p>
              <p>价格: {item.price} ETH</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
