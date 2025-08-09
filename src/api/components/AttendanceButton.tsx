import React from 'react';
import axios from 'axios';

// 勤怠打刻のレスポンスデータを表す型定義
interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  clock_in_time: string | null;
  clock_out_time: string | null;
}

const AttendanceButton: React.FC = () => {
  // ここでAPIトークンを管理します。
  // 実際のアプリケーションでは、ログイン状態やトークンはコンテキストなどでグローバルに管理します。
  const token = 'YOUR_AUTH_TOKEN_HERE';

  const handlePunch = async (type: 'clock_in' | 'clock_out') => {
    try {
      const response = await axios.post<AttendanceRecord>(
        '/api/attendances',
        { type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const record = response.data;
      if (type === 'clock_in') {
        alert(`出勤を記録しました！\n出勤時間: ${new Date(record.clock_in_time!).toLocaleTimeString()}`);
      } else {
        alert(`退勤を記録しました！\n退勤時間: ${new Date(record.clock_out_time!).toLocaleTimeString()}`);
      }
      
      // 画面上の勤怠記録を更新するロジックをここに追加
      // 例: setAttendanceRecords(prev => [...prev, record]);

    } catch (error) {
      // isAxiosErrorの代わりに、エラーオブジェクトにresponseプロパティがあるかチェック
      if (error && typeof error === 'object' && 'response' in error) {
        // バックエンドから返されたエラーメッセージを表示
        alert(`打刻に失敗しました: ${(error as any).response.data.error}`);
      } else {
        alert('エラーが発生しました。');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => handlePunch('clock_in')}>出勤</button>
      <button onClick={() => handlePunch('clock_out')}>退勤</button>
    </div>
  );
};

export default AttendanceButton;