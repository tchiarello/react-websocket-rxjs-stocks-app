import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Button from './Button';

describe('<Button />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be visible', () => {
    render(<Button>Send</Button>);

    expect(screen.getByRole('button', { name: 'Send' })).toBeVisible();
  });

  it('should be disabled', () => {
    render(<Button isDisabled={true}>Send</Button>);

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
});
