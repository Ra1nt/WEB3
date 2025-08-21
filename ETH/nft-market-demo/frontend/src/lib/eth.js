/*
 * @Author: rain l0802_69@qq.com
 * @Date: 2025-08-21 22:19:22
 * @LastEditors: rain l0802_69@qq.com
 * @LastEditTime: 2025-08-21 22:19:55
 * @FilePath: /ETH/nft-market-demo/frontend/src/lib/eth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/lib/eth.js
import { ethers } from "ethers";
import nftAbi from "../abis/NFTCollection.json";
import marketAbi from "../abis/Marketplace.json";
import { NFT_ADDRESS, MARKET_ADDRESS } from "../config";


export async function getProvider() {
if (!window.ethereum) throw new Error("请先安装 MetaMask");
const provider = new ethers.BrowserProvider(window.ethereum);
return provider;
}


export async function requestAccounts(provider) {
return provider.send("eth_requestAccounts", []);
}


export async function getSigner(provider) {
return provider.getSigner();
}


export function getContracts(signerOrProvider) {
const nft = new ethers.Contract(NFT_ADDRESS, nftAbi.abi || nftAbi, signerOrProvider);
const market = new ethers.Contract(MARKET_ADDRESS, marketAbi.abi || marketAbi, signerOrProvider);
return { nft, market };
}


export function short(addr) {
if (!addr) return "";
return `${addr.slice(0,6)}...${addr.slice(-4)}`;
}


export function ipfsToHttp(uri) {
if (typeof uri !== 'string') return uri;
if (uri.startsWith('ipfs://')) return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
return uri;
}