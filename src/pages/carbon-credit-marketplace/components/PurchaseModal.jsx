import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PurchaseModal = ({ credit, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});

  const paymentMethodOptions = [
    { value: '', label: 'Select payment method' },
    { value: 'aed', label: 'AED (Bank Transfer)', description: 'Pay with UAE Dirhams' },
    { value: 'usdt', label: 'USDT (Tether)', description: 'Pay with USDT stablecoin' },
    { value: 'usdc', label: 'USDC (USD Coin)', description: 'Pay with USDC stablecoin' },
    { value: 'izra', label: 'IZRA Tokens', description: 'Get 10% discount with IZRA' }
  ];

  const calculateTotal = () => {
    const baseTotal = credit?.pricePerTonne * quantity;
    const platformFee = paymentMethod === 'izra' ? 0 : baseTotal * 0.02;
    const discount = paymentMethod === 'izra' ? baseTotal * 0.10 : 0;
    return {
      subtotal: baseTotal,
      platformFee,
      discount,
      total: baseTotal + platformFee - discount
    };
  };

  const formatCurrency = (amount) => {
    if (paymentMethod === 'aed') return `AED ${amount?.toFixed(2)}`;
    if (paymentMethod === 'usdt') return `${amount?.toFixed(2)} USDT`;
    if (paymentMethod === 'usdc') return `${amount?.toFixed(2)} USDC`;
    if (paymentMethod === 'izra') return `${amount?.toFixed(2)} IZRA`;
    return `AED ${amount?.toFixed(2)}`;
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e?.target?.value) || 0;
    if (value > credit?.availableTonnage) {
      setErrors({ quantity: `Maximum available: ${credit?.availableTonnage} tonnes` });
    } else if (value < 1) {
      setErrors({ quantity: 'Minimum quantity is 1 tonne' });
    } else {
      setErrors({});
      setQuantity(value);
    }
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      setErrors({ payment: 'Please select a payment method' });
      return;
    }
    if (quantity < 1 || quantity > credit?.availableTonnage) {
      setErrors({ quantity: 'Invalid quantity' });
      return;
    }

    const totals = calculateTotal();
    onConfirm({
      creditId: credit?.id,
      quantity,
      paymentMethod,
      ...totals
    });
  };

  const totals = calculateTotal();

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[300]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Purchase Carbon Credits
            </h2>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-6">
            {/* Project Info */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-2">{credit?.projectName}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  <span>{credit?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Shield" size={16} />
                  <span>{credit?.verificationStandard}</span>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <Input
              label="Quantity (Tonnes)"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={credit?.availableTonnage}
              error={errors?.quantity}
              description={`Available: ${credit?.availableTonnage} tonnes`}
              required
            />

            {/* Payment Method */}
            <Select
              label="Payment Method"
              options={paymentMethodOptions}
              value={paymentMethod}
              onChange={setPaymentMethod}
              error={errors?.payment}
              required
            />

            {/* Price Breakdown */}
            {paymentMethod && (
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground mb-3">Price Breakdown</h4>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({quantity} × {formatCurrency(credit?.pricePerTonne)})</span>
                  <span className="font-medium text-foreground data-text">{formatCurrency(totals?.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee (2%)</span>
                  <span className="font-medium text-foreground data-text">{formatCurrency(totals?.platformFee)}</span>
                </div>

                {paymentMethod === 'izra' && (
                  <div className="flex justify-between text-sm text-success">
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={16} />
                      IZRA Discount (10%)
                    </span>
                    <span className="font-medium data-text">-{formatCurrency(totals?.discount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary data-text">{formatCurrency(totals?.total)}</span>
                </div>
              </div>
            )}

            {/* Info Banner */}
            <div className="flex gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-foreground">
                <p className="font-medium mb-1">NFT Certificate Included</p>
                <p className="text-muted-foreground">
                  Your carbon credits will be minted as NFTs on our blockchain ESG layer for transparency and verification.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={handleConfirm}
                disabled={!paymentMethod || !!errors?.quantity}
              >
                Confirm Purchase
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseModal;