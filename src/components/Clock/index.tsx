'use client'

import moment from 'moment';
import * as React from 'react';

const Clock = () => {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      setTime(moment().format('HH:mm'));
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return <div className='font-bold'>{time}</div>;
};

export default Clock;