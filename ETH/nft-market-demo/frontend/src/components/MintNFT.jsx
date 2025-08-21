import React, { useState } from "react";

const MintNFT = ({ account, nftContract, fetchMyNFTs }) => {
  const [fileUrl, setFileUrl] = useState("");

  const mintNFT = async () => {
    if (!nftContract || !fileUrl) return alert("请先上传图片并输入 URL");
    try {
      const tx = await nftContract.mint(account, fileUrl);
      await tx.wait();
      alert("NFT 铸造成功！");
      await fetchMyNFTs();
      setFileUrl("");
    } catch (err) {
      console.error("铸造失败:", err);
      alert("铸造失败，请查看控制台日志");
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-lg font-bold mb-2">铸造自己的 NFT</h2>
      <input
        type="text"
        placeholder="请输入 NFT 图片 URL"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={mintNFT}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        铸造 NFT
      </button>
    </div>
  );
};

export default MintNFT;
