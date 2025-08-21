# bot/tg_bot.py

from telegram import Update
from telegram.ext import ApplicationBuilder, MessageHandler, ChatMemberHandler, ContextTypes, filters
from datetime import datetime
import psycopg2
from config.db_config import DB_CONFIG

BOT_TOKEN = "8318011388:AAHpuyGiRz0wO71VjV2YCatxz6z5u5EWMqo"

conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = update.message
    if msg:
        cur.execute(
            """INSERT INTO messages (id,user_id,username,chat_id,message,date)
               VALUES (%s,%s,%s,%s,%s,%s) ON CONFLICT (id) DO NOTHING""",
            (msg.message_id, msg.from_user.id, msg.from_user.username, msg.chat.id, msg.text, datetime.now())
        )
        conn.commit()

async def handle_chat_member(update: Update, context: ContextTypes.DEFAULT_TYPE):
    member = update.chat_member
    if member.new_chat_member.status == 'member':
        cur.execute(
            """INSERT INTO daily_stats (date,total_messages,active_users,new_members)
               VALUES (%s,0,0,1)
               ON CONFLICT (date) DO UPDATE SET new_members = daily_stats.new_members + 1""",
            (datetime.today().date(),)
        )
        conn.commit()

app = ApplicationBuilder().token(BOT_TOKEN).build()
app.add_handler(MessageHandler(filters.TEXT | filters.COMMAND, handle_message))
app.add_handler(ChatMemberHandler(handle_chat_member))
print("Bot is running...")
app.run_polling()
