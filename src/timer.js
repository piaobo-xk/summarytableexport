import React, {useState} from 'react';

export default function Timer() {
  const startTime = new Date('2020/09/13 22:06:00').getTime();
  const [now, setNow] = useState(new Date().getTime());
  const duration = now - startTime;
  const days = Math.floor(duration/(24*60*60*1000));
  const hours = Math.floor((duration % (24*60*60*1000))/(60*60*1000));
  const minutes = Math.floor((duration % (60*60*1000))/(60*1000));
  const seconds = Math.floor((duration % (60*1000))/(1000));
  const durationStr = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
  setInterval(() => {
    setNow(new Date().getTime());
  }, 1000);
  return (
    <div style={{textAlign: 'right', color: '#fff', fontSize: '3px'}}>{durationStr}</div>
  );
}