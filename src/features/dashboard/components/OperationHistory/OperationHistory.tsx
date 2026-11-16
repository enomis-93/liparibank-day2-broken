import { useEffect } from 'react';
import styles from './OperationHistory.module.css';

export interface Operation {
  id: number;
  type: 'deposito' | 'prelievo';
  amount: number;
  timestamp: Date;
}

interface OperationHistoryProps {
  operations: Operation[];
}

const OperationHistory = ({ operations }: OperationHistoryProps) => {
  useEffect(() => {
    console.log('Storico operazioni aggiornato:', operations);
  }, [operations]);

  return (
    <section className={styles.card} aria-labelledby="operation-history-title">
      <h3 id="operation-history-title" className={styles.title}>Storico operazioni</h3>
      {operations.length === 0 ? (
        <p className={styles.empty}>Nessuna operazione effettuata.</p>
      ) : (
        <ul>
          {operations.map((operation) => (
            <li key={operation.id} className={styles.item}>
              <span>
                {operation.type === 'deposito' ? 'Deposito' : 'Prelievo'}{' '}
                {operation.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
              </span>
              <time dateTime={operation.timestamp.toISOString()}>
                {operation.timestamp.toLocaleString('it-IT')}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default OperationHistory;
