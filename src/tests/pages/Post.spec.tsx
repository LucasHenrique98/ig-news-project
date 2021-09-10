import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';

const post = { slug: 'test', title: 'test', content: '<p>Post test</p>', updatedAt: '9 de agosto' };

jest.mock('next-auth/client');
jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Post test')).toBeInTheDocument();
  });

  it('redirects user if no subscription was found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'test',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    );
  });
});
