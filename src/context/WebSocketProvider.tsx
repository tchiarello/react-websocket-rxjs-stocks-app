import {
  FC,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import { delay, finalize, retryWhen, take, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

interface WebSocketProviderState {
  error: string | null;
  subject: WebSocketSubject<unknown>;
}

const subject = webSocket('ws://localhost:8425/');

const WebSocketContext = createContext<WebSocketProviderState>({
  error: null,
  subject,
});

const WebStockProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    subject
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap(() => {
              setError('Server is down... Trying to reconnect...');
            }),
            delay(3000),
            take(3),
            finalize(() => {
              setError('Server is offline. Prices might not be updated.');
            }),
          ),
        ),
      )
      .subscribe({
        next: () => setError(null),
      });
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        error,
        subject,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketProviderState => {
  return useContext(WebSocketContext);
};

export default WebStockProvider;
