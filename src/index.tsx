import React from 'react';
import ReactDOM from 'react-dom/client';
import AttendanceButton from './api/components/AttendanceButton'; // AttendanceButtonコンポーネントをインポート

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* AttendanceButtonコンポーネントをレンダリング */}
      <AttendanceButton />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
