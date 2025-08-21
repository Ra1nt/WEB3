#!/bin/bash
###
 # @Author: rain l0802_69@qq.com
 # @Date: 2025-08-15 14:36:54
 # @LastEditors: rain l0802_69@qq.com
 # @LastEditTime: 2025-08-15 14:39:22
 # @FilePath: /web3-eth-dev/web3-eth-dev/start_vc.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
lighthouse vc \
  --debug-level=info \
  --testnet-dir=/network-configs \
  --validators-dir=/validator-keys/keys \
  --secrets-dir=/validator-keys/secrets \
  --init-slashing-protection \
  --beacon-nodes=http://172.16.0.12:4000 \
  --suggested-fee-recipient=0x8943545177806ED17B9F23F0a21ee5948eCaa776 \
  --metrics \
  --metrics-address=0.0.0.0 \
  --metrics-port=8080 \
  --metrics-allow-origin=*
