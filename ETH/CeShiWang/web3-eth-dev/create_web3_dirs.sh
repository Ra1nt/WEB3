OOT_DIR="web3-eth-dev"

# 创建主目录
mkdir -p $ROOT_DIR

# 创建文件
touch $ROOT_DIR/network_params.yaml
touch $ROOT_DIR/start_vc.sh
touch $ROOT_DIR/start_bn.sh
touch $ROOT_DIR/start_geth.sh

# 创建子目录及文件
mkdir -p $ROOT_DIR/network-configs
touch $ROOT_DIR/network-configs/genesis.json

mkdir -p $ROOT_DIR/validator-keys/keys
mkdir -p $ROOT_DIR/validator-keys/secrets

mkdir -p $ROOT_DIR/jwt
touch $ROOT_DIR/jwt/jwtsecret

echo "目录结构已生成完毕："
tree $ROOT_DIR

