import { screen, render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import SignInButton from './SignInButton';

jest.mock('next-auth/client');
const useSessionsMocked = mocked(useSession);

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    useSessionsMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    useSessionsMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'johndoe@example.com' }, expires: 'fake-expires' },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
