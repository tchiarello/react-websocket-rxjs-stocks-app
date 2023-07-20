import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vitest } from 'vitest';
import StockCard from './StockCard';

const isinMock = 'DE0000000000';

const stockMock = {
  isin: isinMock,
  price: 10.32,
  ask: 9.15,
  bid: 9.08,
};

const mockUseWebSocket = () => ({
  subject: {
    multiplex: () => ({
      subscribe: (callback: (res: any) => void) => {
        callback(stockMock);

        return {
          unsubscribe: () => {},
        };
      },
    }),
  },
});
vitest.mock('../../context/WebSocketProvider', () => ({
  useWebSocket: () => mockUseWebSocket(),
}));

describe('<StockCard />', () => {
  it('should render with prices correctly', () => {
    render(<StockCard isin={isinMock} onRemove={vitest.fn()} />);

    const isin = screen.getByText(isinMock);
    const price = screen.getByRole('heading', { name: '10,32 €' });
    const ask = screen.getByRole('heading', { name: '9,15 €' });
    const bid = screen.getByRole('heading', { name: '9,08 €' });

    expect(isin).toBeVisible();
    expect(price).toBeVisible();
    expect(ask).toBeVisible();
    expect(bid).toBeVisible();
  });

  it('should call onRemove', async () => {
    const onRemove = vitest.fn();

    render(<StockCard isin={isinMock} onRemove={onRemove} />);

    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));

    expect(onRemove).toHaveBeenCalled();
  });
});
