import React, {
  createContext, useState, useContext, ReactNode, useMemo,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import ToastNotification from '@mui/material/Alert';

type Severity = 'success' | 'info' | 'error';

interface INotification {
  open: boolean;
  type: Severity | undefined;
  content: string;
}

interface INotificationContext {
  notify: {
    success: (successMsg: string) => void;
    error: (errorMsg: string) => void;
  };
}

const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<INotification>({
    open: false,
    type: undefined,
    content: '',
  });

  const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const notify = {
    success: (successMsg: string) => setNotification({
      open: true,
      type: 'success',
      content: successMsg,
    }),
    error: (errorMsg: string) => {
      setNotification({
        open: true,
        type: 'error',
        content: errorMsg,
      });
    },
  };

  const value = useMemo(() => ({ notify }), []);

  return (
    <NotificationContext.Provider
      value={value}
    >
      {children}
      <Snackbar
        open={notification.open}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <div>
          <ToastNotification severity={notification.type}>
            {notification.content}
          </ToastNotification>
        </div>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
