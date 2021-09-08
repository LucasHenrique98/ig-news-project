import { screen, render, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import SubscribeButton from './SubscribeButton';

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    },
    signIn: jest.fn(),
  };
});

jest.mock('next/router');

const signInMocked = mocked(signIn);
const pushMocked = mocked(useRouter);
const useRouterMocked = mocked(useRouter);

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMocked).toHaveBeenCalled();
  });
});
