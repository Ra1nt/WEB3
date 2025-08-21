/*
 * @Author: rain l0802_69@qq.com
 * @Date: 2025-08-16 11:39:12
 * @LastEditors: rain l0802_69@qq.com
 * @LastEditTime: 2025-08-16 12:27:47
 * @FilePath: /nft-market-demo/hardhat.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
require("@nomicfoundation/hardhat-toolbox"); // 集成 ethers、waffle、hardhat 等

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
