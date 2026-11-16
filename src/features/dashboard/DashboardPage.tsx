import { useState, useEffect, useRef } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard/AccountBalanceCard';
import OperationHistory, { type Operation } from './components/OperationHistory/OperationHistory';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [balance, setBalance] = useState(4250.00);
  const [operations, setOperations] = useState<Operation[]>([]);
  const nextOperationId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => {
        const delta = (Math.random() * 200 - 100);
        return Math.round((prev + delta) * 100) / 100;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleOperation = (type: Operation['type']) => {
    const operation: Operation = {
      id: nextOperationId.current++,
      type,
      amount: 100,
      timestamp: new Date(),
    };

    setBalance((previous) => previous + (type === 'deposito' ? operation.amount : -operation.amount));
    setOperations((previous) => [...previous, operation].slice(-5));
  };

  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Dashboard</h1>
        <p className={styles.welcomeSubtitle}>
          Riepilogo della tua situazione finanziaria aggiornata in tempo reale.
        </p>
      </div>

      <div className={styles.grid}>
        <AccountBalanceCard balance={balance} />
        <RecentTransactions />
        <div>
          <div className={styles.operationButtons}>
            <button type="button" onClick={() => handleOperation('deposito')}>+ Deposita €100</button>
            <button type="button" onClick={() => handleOperation('prelievo')}>− Preleva €100</button>
          </div>
          <OperationHistory operations={operations} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
