import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vitest } from 'vitest';
import TextField from './TextField';

describe('<TextField />', () => {
  it('should be visible', () => {
    render(<TextField value="Hello" />);

    const field = screen.getByRole('textbox');

    expect(field).toBeVisible();
    expect(field).toHaveValue('Hello');
  });

  it('should render with placeholder', () => {
    render(<TextField placeholder="ISIN code" />);

    expect(screen.getByPlaceholderText('ISIN code')).toBeVisible();
  });

  it('should be able to change the value', async () => {
    const onChange = vitest.fn();

    render(<TextField onChange={onChange} />);

    const field = screen.getByRole('textbox');

    await userEvent.type(field, 'US1111111111');

    expect(onChange).toHaveBeenCalled();
    expect(field).toHaveValue('US1111111111');
  });
});
