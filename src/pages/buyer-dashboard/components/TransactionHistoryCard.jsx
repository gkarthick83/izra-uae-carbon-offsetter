import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistoryCard = ({ transactions, onViewReceipt }) => {
  const getPaymentMethodIcon = (method) => {
    const icons = {
      'AED': 'Banknote',
      'USDT': 'DollarSign',
      'USDC': 'DollarSign',
      'IZRA': 'Coins',
    };
    return icons?.[method] || 'CreditCard';
  };

  return (
    <div className="bg-card rounded-xl shadow-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Transaction History</h3>
        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
          Export
        </Button>
      </div>
      <div className="space-y-4">
        {transactions?.map((transaction) => (
          <div
            key={transaction?.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm md:text-base mb-1 line-clamp-1">
                  {transaction?.projectName}
                </h4>
                <div className="flex items-center gap-2 flex-wrap text-xs md:text-sm text-muted-foreground">
                  <span>{transaction?.date}</span>
                  <span>•</span>
                  <span>{transaction?.tonnage} tCO₂</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Icon name={getPaymentMethodIcon(transaction?.paymentMethod)} size={14} />
                    {transaction?.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4">
              <div className="text-right">
                <p className="font-semibold text-foreground text-sm md:text-base">
                  {transaction?.amount}
                </p>
                {transaction?.discount && (
                  <p className="text-xs text-success">
                    {transaction?.discount} discount
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="FileText"
                onClick={() => onViewReceipt(transaction)}
                aria-label="View receipt"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistoryCard;