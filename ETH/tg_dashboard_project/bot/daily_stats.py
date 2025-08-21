# bot/daily_stats.py

from datetime import datetime
import psycopg2
from config.db_config import DB_CONFIG

# 数据库连接
conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

def update_daily_stats():
    today = datetime.today().date()

    # 统计今日消息总数
    cur.execute("SELECT COUNT(*) FROM messages WHERE date::date = %s", (today,))
    total_messages = cur.fetchone()[0]

    # 统计今日活跃用户数
    cur.execute("SELECT COUNT(DISTINCT user_id) FROM messages WHERE date::date = %s", (today,))
    active_users = cur.fetchone()[0]

    # 统计今日新成员数
    cur.execute("SELECT new_members FROM daily_stats WHERE date = %s", (today,))
    row = cur.fetchone()
    new_members = row[0] if row else 0

    # 更新或插入每日统计
    cur.execute(
        """INSERT INTO daily_stats (date,total_messages,active_users,new_members)
           VALUES (%s,%s,%s,%s)
           ON CONFLICT (date) DO UPDATE
           SET total_messages = EXCLUDED.total_messages,
               active_users = EXCLUDED.active_users,
               new_members = EXCLUDED.new_members""",
        (today, total_messages, active_users, new_members)
    )
    conn.commit()
    print(f"Updated stats for {today}: messages={total_messages}, users={active_users}, new_members={new_members}")

if __name__ == "__main__":
    update_daily_stats()
