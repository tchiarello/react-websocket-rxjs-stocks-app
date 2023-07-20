import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { useWebSocket } from '../../context/WebSocketProvider';

import Button from '../button/Button';

import styles from './StockCard.module.scss';

const currenciesList = (country: string) => {
  switch (country) {
    case 'DE':
    case 'AT':
    case 'ES':
    case 'FR':
      return 'EUR';
    case 'GB':
      return 'GBP';
    case 'US':
      return 'USD';
    case 'BR':
      return 'BRL';
    default:
      return 'EUR';
  }
};

interface StockCardProps {
  isin: string;
  onRemove: MouseEventHandler<HTMLButtonElement>;
}

interface Stock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

const StockCard: FC<StockCardProps> = ({ isin, onRemove }) => {
  const [stock, setStock] = useState<Stock>();
  const { subject } = useWebSocket();

  useEffect(() => {
    const observable = subject.multiplex(
      () => ({ subscribe: isin }),
      () => ({ unsubscribe: isin }),
      // It receives a lot of messages at the same time.
      // It filters the message that has the same ISIN received by props.
      (res) => (res as Stock).isin === isin,
    );

    const subscribe = observable.subscribe((res) => {
      setStock(res as Stock);
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [isin]);

  const formatNumberByCurrency = (number: number) => {
    const country = isin.slice(0, 2);

    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currenciesList(country),
    }).format(number);
  };

  if (!stock) return null;

  return (
    <div className={styles.stock}>
      <div className={styles.card}>
        <div className={styles.price}>
          <p>{isin}</p>
          <h3>{formatNumberByCurrency(stock.price)}</h3>
        </div>
        <div className={styles['price-variation']}>
          <div className={styles.variation}>
            <p>Bid</p>
            <h3>{formatNumberByCurrency(stock.bid)}</h3>
          </div>
          <div className={styles.variation}>
            <p>Ask</p>
            <h3>{formatNumberByCurrency(stock.ask)}</h3>
          </div>
        </div>
      </div>

      <Button className={styles.remove} id="button-remove" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};

export default StockCard;
