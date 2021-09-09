import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts/';
import { getPrismicClient } from '../../services/prismic';

const posts = [{ slug: 'test', title: 'test', excerpt: 'teste', updatedAt: '9 de agosto' }];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'new post',
            data: {
              title: [{ type: 'heading', text: 'new post' }],
              content: [{ type: 'paragraph', text: 'post excerpt' }],
            },
            last_publication_date: '04-01-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'new post',
              title: 'new post',
              excerpt: 'post excerpt',
              updatedAt: '01 de abril de 2021',
            },
          ],
        },
      })
    );
  });
});
