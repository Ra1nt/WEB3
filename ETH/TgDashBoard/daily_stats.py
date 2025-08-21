import psycopg2
import pandas as pd
from datetime import date

DB_CONFIG = {
    "dbname": "tg_dashboard",
    "user": "postgres",
    "password": "yourpassword",
    "host": "localhost"
}

conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

# 读取今天消息
df = pd.read_sql("SELECT * FROM messages WHERE date::date = CURRENT_DATE", conn)

total_messages = len(df)
active_users = df['user_id'].nunique()
new_members = 0  # 可通过 ChatMemberHandler 更新 daily_stats

cur.execute(
    """
    INSERT INTO daily_stats (date, total_messages, active_users, new_members)
    VALUES (%s, %s, %s, %s)
    ON CONFLICT (date) DO UPDATE 
    SET total_messages=%s, active_users=%s, new_members=%s
    """,
    (date.today(), total_messages, active_users, new_members,
     total_messages, active_users, new_members)
)
conn.commit()
