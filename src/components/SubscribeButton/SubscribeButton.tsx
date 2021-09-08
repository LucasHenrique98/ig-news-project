import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';
import styles from './style.module.scss';

export default function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  const handleSubsribe = async () => {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => {
        handleSubsribe();
      }}
    >
      Subscribe now
    </button>
  );
}
