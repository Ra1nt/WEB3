from telegram.ext import Updater, MessageHandler, Filters, ChatMemberHandler
import psycopg2
from datetime import datetime
import pandas as pd

# --------------------
# 配置
# --------------------
BOT_TOKEN = "YOUR_BOT_TOKEN"  # 替换成你的 Bot Token
DB_CONFIG = {
    "dbname": "tg_dashboard",
    "user": "postgres",
    "password": "yourpassword",
    "host": "localhost"
}

# --------------------
# 数据库连接
# --------------------
conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

# --------------------
# 消息处理
# --------------------
def handle_message(update, context):
    msg = update.message
    if msg:
        cur.execute(
            """
            INSERT INTO messages (id, user_id, username, chat_id, message, date) 
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (msg.message_id, msg.from_user.id, msg.from_user.username, msg.chat.id, msg.text, datetime.now())
        )
        conn.commit()

# --------------------
# 群成员更新处理（记录新成员）
# --------------------
def handle_chat_member(update, context):
    member = update.chat_member
    if member.new_chat_member.status == 'member':
        # 可在 daily_stats 里记录新成员
        cur.execute(
            """
            INSERT INTO daily_stats (date, total_messages, active_users, new_members)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (date) DO UPDATE 
            SET new_members = daily_stats.new_members + 1
            """,
            (datetime.today().date(), 0, 0, 1)
        )
        conn.commit()

# --------------------
# Bot 启动
# --------------------
updater = Updater(token=BOT_TOKEN, use_context=True)
dispatcher = updater.dispatcher

dispatcher.add_handler(MessageHandler(Filters.text | Filters.command, handle_message))
dispatcher.add_handler(ChatMemberHandler(handle_chat_member, ChatMemberHandler.CHAT_MEMBER))

print("Bot is running...")
updater.start_polling()
updater.idle()
