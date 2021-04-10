import React from 'react';
import styles from './style.module.scss';

interface SubscriberButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscriberButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
