import React from "react";

const MyNFTs = ({ myNFTs }) => (
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
  </div>
);

export default MyNFTs;
