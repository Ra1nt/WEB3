import React from "react";

const Navbar = ({ account, connectWallet }) => (
  <div className="flex justify-between items-center mb-6 p-4 bg-gray-200 rounded">
    <h1 className="font-bold text-xl">NFT DApp</h1>
    {account ? (
      <span className="text-green-600">已连接: {account}</span>
    ) : (
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        连接钱包
      </button>
    )}
  </div>
);

export default Navbar;
