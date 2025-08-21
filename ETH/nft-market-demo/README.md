<<<<<<< HEAD
<!--
 * @Author: rain l0802_69@qq.com
 * @Date: 2025-08-16 11:39:41
 * @LastEditors: rain l0802_69@qq.com
 * @LastEditTime: 2025-08-21 22:09:59
 * @FilePath: /ETH/nft-market-demo/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
🖼️ NFT Market Demo

一个基于 Hardhat + React + Vite 的去中心化 NFT 交易市场 DApp。 支持 NFT 铸造、上架、购买 等基本功能。

⚙️ 环境配置

安装 Node.js & npm
推荐使用 Node.js v18+

node -v npm -v

克隆项目 git clone https://github.com/yourname/nft-market-demo.git cd nft-market-demo

安装依赖

项目分为 合约（Hardhat） 和 前端（Vite+React）：

合约依赖 cd nft-market-demo npm install

前端依赖 cd frontend npm install

启动本地测试链（Hardhat）
回到合约根目录，启动 Hardhat 内置测试网络：

npx hardhat node

👉 会在 http://127.0.0.1:8545 启动本地测试链，并自动生成 20 个测试账户。

部署合约
在另一个终端中运行：

npx hardhat run scripts/deploy.js --network localhost

输出类似：

NFTCollection deployed to: 0x1234... Marketplace deployed to: 0x5678...

配置前端连接合约
修改 frontend/src/config.js：

export const NFT_COLLECTION_ADDRESS = "0x1234..."; // NFT 合约地址 export const MARKETPLACE_ADDRESS = "0x5678..."; // Marketplace 合约地址

启动前端
进入 frontend/ 目录：

npm run dev

前端运行在： 👉 http://localhost:5173

连接钱包
在浏览器安装 MetaMask

添加本地网络：

RPC: http://127.0.0.1:8545

Chain ID: 31337

导入 Hardhat 给的私钥（前 1~2 个测试账户即可）

在 DApp 中点击 Connect Wallet

📌 常用命令

编译合约

npx hardhat compile

运行测试

npx hardhat test

打包前端

npm run build
=======
🖼️ NFT Market Demo

一个基于 Hardhat + React + Vite 的去中心化 NFT 交易市场 DApp。
支持 NFT 铸造、上架、购买 等基本功能。

⚙️ 环境配置
1. 安装 Node.js & npm

推荐使用 Node.js v18+

node -v
npm -v

2. 克隆项目
git clone https://github.com/yourname/nft-market-demo.git
cd nft-market-demo

3. 安装依赖

项目分为 合约（Hardhat） 和 前端（Vite+React）：

合约依赖
cd nft-market-demo
npm install

前端依赖
cd frontend
npm install

4. 启动本地测试链（Hardhat）

回到合约根目录，启动 Hardhat 内置测试网络：

npx hardhat node


👉 会在 http://127.0.0.1:8545 启动本地测试链，并自动生成 20 个测试账户。

5. 部署合约

在另一个终端中运行：

npx hardhat run scripts/deploy.js --network localhost


输出类似：

NFTCollection deployed to: 0x1234...
Marketplace deployed to: 0x5678...

6. 配置前端连接合约

修改 frontend/src/config.js：

export const NFT_COLLECTION_ADDRESS = "0x1234...";   // NFT 合约地址
export const MARKETPLACE_ADDRESS = "0x5678...";      // Marketplace 合约地址

7. 启动前端

进入 frontend/ 目录：

npm run dev


前端运行在：
👉 http://localhost:5173

8. 连接钱包

在浏览器安装 MetaMask

添加本地网络：

RPC: http://127.0.0.1:8545

Chain ID: 31337

导入 Hardhat 给的私钥（前 1~2 个测试账户即可）

在 DApp 中点击 Connect Wallet

📌 常用命令

编译合约

npx hardhat compile


运行测试

npx hardhat test


打包前端

npm run build
>>>>>>> origin/main
