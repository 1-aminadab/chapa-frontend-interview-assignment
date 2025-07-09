
import React, { useState } from 'react';
import { FiDollarSign, FiSend, FiTrendingUp, FiClock } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { TransactionType, TransactionStatus } from '@/types';
export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { transactions, addTransaction } = useAppStore();
  const [transactionForm, setTransactionForm] = useState({
    amount: '',
    recipient: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    addTransaction({
      amount: parseFloat(transactionForm.amount),
      type: TransactionType.SEND,
      status: TransactionStatus.PENDING,
      description: transactionForm.description,
      recipientName: transactionForm.recipient
    });

    setTransactionForm({ amount: '', recipient: '', description: '' });
    setIsSubmitting(false);
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return <FiTrendingUp className="status-icon completed" />;
      case TransactionStatus.PENDING:
        return <FiClock className="status-icon pending" />;
      default:
        return <FiClock className="status-icon failed" />;
    }
  };

  return (
    <div className="dashboard user-dashboard">
      <div className="dashboard-grid">
        <Card title="Wallet Balance" className="balance-card">
          <div className="balance-content">
            <FiDollarSign className="balance-icon" />
            <div className="balance-amount">
              <span className="currency">ETB</span>
              <span className="amount">{currentUser?.walletBalance?.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card title="Send Money" className="transaction-form-card">
          <form onSubmit={handleTransactionSubmit} className="transaction-form">
            <div className="form-group">
              <label>Amount (ETB)</label>
              <input
                type="number"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                placeholder="0.00"
                required
                step="0.01"
                min="0.01"
              />
            </div>

            <div className="form-group">
              <label>Recipient</label>
              <input
                type="text"
                value={transactionForm.recipient}
                onChange={(e) => setTransactionForm({ ...transactionForm, recipient: e.target.value })}
                placeholder="Enter recipient name"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={transactionForm.description}
                onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                placeholder="Payment description"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="send-button"
            >
              <FiSend />
              {isSubmitting ? 'Processing...' : 'Send Money'}
            </Button>
          </form>
        </Card>

        <Card title="Recent Transactions" className="transactions-card">
          <div className="transactions-list">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-header">
                    <span className="transaction-description">{transaction.description}</span>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div className="transaction-details">
                    <span className="transaction-date">{transaction.date}</span>
                    {transaction.recipientName && (
                      <span className="transaction-recipient">To: {transaction.recipientName}</span>
                    )}
                  </div>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === TransactionType.RECEIVE ? '+' : '-'}
                    ETB {transaction.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
