-- 创建数据库
CREATE DATABASE tg_dashboard;

-- 使用数据库
\c tg_dashboard;

-- 消息表
CREATE TABLE messages (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    username TEXT,
    chat_id BIGINT,
    message TEXT,
    date TIMESTAMP
);

-- 每日统计表
CREATE TABLE daily_stats (
    date DATE PRIMARY KEY,
    total_messages INT,
    active_users INT,
    new_members INT
);
