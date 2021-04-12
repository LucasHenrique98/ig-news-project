import { useSession, signIn } from 'next-auth/client';
import React from 'react';
import styles from './style.module.scss';

interface SubscriberButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscriberButtonProps) {
  const [session] = useSession();

  const handleSubsribe = () => {
    if (!session) {
      signIn('github');
      return;
    }
  };

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
