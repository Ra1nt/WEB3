// frontend/src/components/Marketplace.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Marketplace({ marketContract }) {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    if (!marketContract) return;
    const [ids, items] = await marketContract.getActiveListings();
    const data = ids.map((id, idx) => ({
      listingId: id,
      tokenId: items[idx].tokenId,
      price: ethers.formatEther(items[idx].price),
    }));
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, [marketContract]);

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold mb-2">市场 NFT</h2>
      <div className="grid grid-cols-2 gap-2">
        {listings.map((item) => (
          <div key={item.listingId} className="border p-2 rounded">
            <p>Token ID: {item.tokenId}</p>
            <p>价格: {item.price} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}
