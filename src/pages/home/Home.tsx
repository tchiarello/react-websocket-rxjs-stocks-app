import { useEffect, useState } from 'react';
import { useWebSocket } from '../../context/WebSocketProvider';

import Header from '../../components/header/Header';
import TextField from '../../components/text-field/TextField';
import Button from '../../components/button/Button';
import StockCard from '../../components/stock-card/StockCard';

import styles from './Home.module.scss';

const Home = () => {
  const [isins, setIsins] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [error, setError] = useState('');
  const { error: webSocketError } = useWebSocket();

  useEffect(() => {
    try {
      const data = localStorage.getItem('isins') ?? '';

      setIsins(JSON.parse(data));
    } catch (error) {
      console.error('Failed to parse isins from local storage', error);
    }
  }, []);

  useEffect(() => {
    if (inputSearch.length === 0) {
      setError('');
    }
  }, [inputSearch]);

  const saveIsinsToLocalStorage = (data: string[]) => {
    localStorage.setItem('isins', JSON.stringify(data));
  };

  const validateIsin = () => {
    const isinAlreadyExists = Boolean(
      isins.find((isin) => isin === inputSearch),
    );
    if (isinAlreadyExists) {
      setError('ISIN has been added already.');
      return false;
    }

    const isIsinValid = new RegExp(/^[a-zA-Z]{2}[a-zA-Z0-9]{9}[0-9]{1}$/g).test(
      inputSearch,
    );
    if (!isIsinValid) {
      setError('ISIN is not valid. Did you type it correctly?');
      return false;
    }

    return true;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validateIsin()) {
      const newIsins = [inputSearch, ...isins];
      setIsins(newIsins);
      saveIsinsToLocalStorage(newIsins);
      setInputSearch('');
      setError('');
    }
  };

  const handleRemoveIsin = (item: string) => {
    const filteredIsins = isins.filter((isin) => isin !== item);
    setIsins(filteredIsins);
    saveIsinsToLocalStorage(filteredIsins);
  };

  return (
    <div className={styles.home}>
      <Header />

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <TextField
              id="input-isin"
              value={inputSearch}
              onChange={(event) => setInputSearch(event.target.value)}
              error={Boolean(error)}
              isDisabled={Boolean(webSocketError)}
              placeholder="ISIN number"
            />
            <Button
              className={styles.send}
              isDisabled={Boolean(inputSearch.length === 0 || webSocketError)}
              type="submit"
              id="button-send"
            >
              Send
            </Button>
          </div>

          {!error && (
            <p className={styles.description}>
              An International Securities Identification Number (ISIN) is a
              12-digit alphanumeric code that uniquely identifies a specific
              security.
            </p>
          )}

          {error && (
            <p data-testid="input-error" className={styles['input-error']}>
              {error}
            </p>
          )}
        </form>

        <div className={styles.cards}>
          {isins.map((isin) => (
            <StockCard
              key={isin}
              isin={isin}
              onRemove={() => handleRemoveIsin(isin)}
            />
          ))}
        </div>
      </main>

      {webSocketError && (
        <div className={styles['websocket-error']}>
          <p>{webSocketError}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
