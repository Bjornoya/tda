import { useEffect, useState } from 'react';
import { useNotification } from './context/notification.context';

function ConnectionStatus() {
  const { notify } = useNotification();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      const status = navigator.onLine;
      if (status) {
        notify.success('Hurray! Internet is connected.');
      } else {
        notify.error('Oops! Internet is disconnected.');
      }
      setIsOnline(status);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);
  return null;
}

export default ConnectionStatus;
