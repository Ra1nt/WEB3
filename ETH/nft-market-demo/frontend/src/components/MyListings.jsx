import React from "react";

const MyListings = ({ marketContract, account, fetchListings }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">我的上架 NFT</h2>
      {/* 这里可以复用 Marketplace 的 activeListings 过滤 account */}
      <p>功能可扩展：显示自己的 activeListing 并允许取消上架</p>
    </div>
  );
};

export default MyListings;
