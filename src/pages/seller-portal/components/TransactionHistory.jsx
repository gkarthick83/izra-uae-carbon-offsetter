import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionHistory = ({ transactions }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'sale':
        return { name: 'TrendingUp', color: 'text-success' };
      case 'fee':
        return { name: 'Minus', color: 'text-warning' };
      case 'payout':
        return { name: 'ArrowDownToLine', color: 'text-primary' };
      default:
        return { name: 'DollarSign', color: 'text-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Transaction History
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Recent sales and platform fee deductions
        </p>
      </div>
      <div className="divide-y divide-border">
        {transactions?.map((transaction) => {
          const icon = getTransactionIcon(transaction?.type);
          return (
            <div key={transaction?.id} className="p-4 md:p-6 hover:bg-muted/50 transition-smooth">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                  <Icon name={icon?.name} size={20} className={icon?.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                      {transaction?.description}
                    </h4>
                    <p className={`text-sm md:text-base font-semibold whitespace-nowrap ${
                      transaction?.type === 'fee' ? 'text-warning' : 'text-success'
                    }`}>
                      {transaction?.type === 'fee' ? '-' : '+'}AED {transaction?.amount?.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(transaction.date)?.toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{new Date(transaction.date)?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {transaction?.buyer && (
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={14} />
                        <span className="line-clamp-1">{transaction?.buyer}</span>
                      </div>
                    )}
                  </div>

                  {transaction?.credits && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded text-xs text-primary">
                      <Icon name="Leaf" size={12} />
                      <span>{transaction?.credits} tCO₂</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {transactions?.length === 0 && (
        <div className="p-8 md:p-12 text-center">
          <Icon name="Receipt" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-foreground font-medium mb-2">No Transactions Yet</p>
          <p className="text-sm text-muted-foreground">
            Your transaction history will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;