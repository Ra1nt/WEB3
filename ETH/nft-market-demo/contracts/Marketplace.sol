// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract Marketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        address nft;
        uint256 tokenId;
        uint256 price;     // 以 wei 计价
        bool active;
    }

    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, address indexed seller, address indexed nft, uint256 tokenId, uint256 price);
    event Sold(uint256 indexed listingId, address indexed buyer);
    event Canceled(uint256 indexed listingId);

    /**
     * @notice 上架：将 NFT 托管到本合约
     */
    function createListing(address nft, uint256 tokenId, uint256 price) external nonReentrant returns (uint256) {
        require(price > 0, "price = 0");
        IERC721 token = IERC721(nft);
        // 需先在前端/钱包里对 Marketplace 调用 approve
        token.transferFrom(msg.sender, address(this), tokenId);

        uint256 id = ++nextListingId;
        listings[id] = Listing({
            seller: msg.sender,
            nft: nft,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit Listed(id, msg.sender, nft, tokenId, price);
        return id;
    }

    /**
     * @notice 购买：支付 ETH，合约将 NFT 转给买家并将款项转给卖家
     */
    function buy(uint256 listingId) external payable nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "inactive");
        require(msg.value == l.price, "bad price");

        l.active = false; // 先置无效防重入
        payable(l.seller).transfer(msg.value);
        IERC721(l.nft).transferFrom(address(this), msg.sender, l.tokenId);

        emit Sold(listingId, msg.sender);
    }

    /**
     * @notice 卖家下架：取回 NFT
     */
    function cancel(uint256 listingId) external nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "inactive");
        require(l.seller == msg.sender, "not seller");

        l.active = false;
        IERC721(l.nft).transferFrom(address(this), msg.sender, l.tokenId);
        emit Canceled(listingId);
    }

    /**
     * @notice 查询所有在售商品（为演示方便；生产环境建议用事件+索引或分页）
     */
    function getActiveListings() external view returns (
        uint256[] memory ids,
        Listing[] memory items
    ) {
        uint256 count;
        for (uint256 i = 1; i <= nextListingId; i++) {
            if (listings[i].active) count++;
        }
        ids = new uint256[](count);
        items = new Listing[](count);
        uint256 idx;
        for (uint256 i = 1; i <= nextListingId; i++) {
            if (listings[i].active) {
                ids[idx] = i;
                items[idx] = listings[i];
                idx++;
            }
        }
    }
}