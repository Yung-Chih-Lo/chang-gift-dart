資料表名稱 (Collection Name),主要用途,欄位 (Fields) 建議,變動與邏輯說明
participants,身份驗證與禮物登記：序號即是參與者的唯一 ID。,"code (Text, Unique)：參與者輸入的序號 (即號碼牌號碼)is_revealed (Boolean)：是否已揭露該禮物 (預設 false)。initial_gift_name (Text)：此序號持有者一開始帶來的禮物名稱。",這是所有參與者的清單。序號不再只是開關，而是身份證明。
votes,投票紀錄：紀錄誰投了誰。,"voter_code (Relation/Text, Unique)：投票者的序號 ID。voted_gift_name (Text)：被投的禮物名稱。",投票目標是禮物名稱，因為禮物名稱是不可變的。