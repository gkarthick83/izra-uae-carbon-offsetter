import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionHistoryTable = ({ transactions }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'stake': return 'ArrowUpCircle';
      case 'unstake': return 'ArrowDownCircle';
      case 'reward': return 'Gift';
      case 'purchase': return 'ShoppingCart';
      default: return 'Activity';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'stake': return 'text-primary';
      case 'unstake': return 'text-warning';
      case 'reward': return 'text-success';
      case 'purchase': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      failed: 'bg-error/10 text-error',
    };
    return styles?.[status] || styles?.pending;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h4 className="text-base md:text-lg font-semibold text-foreground">Transaction History</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">Type</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3 hidden md:table-cell">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3 hidden lg:table-cell">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr key={transaction?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon name={getTypeIcon(transaction?.type)} size={20} className={getTypeColor(transaction?.type)} />
                    <span className="text-sm font-medium text-foreground capitalize">{transaction?.type}</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-semibold text-foreground data-text">
                    {transaction?.amount?.toLocaleString()} IZRA
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{transaction?.date}</span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground data-text font-mono">{transaction?.txId}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;