// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => address) public creators;

    constructor() ERC721("DemoNFT", "DNFT") Ownable(msg.sender) {}

    /**
     * @notice 铸造 NFT（任何人可铸造，接收者可自定义）。
     * @param to 接收地址
     * @param tokenURI 元数据 URI（本示例前端会传入 data:... 格式）
     */
    function mint(address to, string memory tokenURI) external returns (uint256) {
        uint256 tokenId = ++nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        creators[tokenId] = msg.sender;
        return tokenId;
    }
}