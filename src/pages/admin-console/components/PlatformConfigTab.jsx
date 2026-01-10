import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PlatformConfigTab = () => {
  const [serviceFee, setServiceFee] = useState('2');
  const [izraDiscount, setIzraDiscount] = useState('10');
  const [minTreeSponsorship, setMinTreeSponsorship] = useState('5');
  const [maxTreeSponsorship, setMaxTreeSponsorship] = useState('1000');
  const [sellerAnnualFee, setSellerAnnualFee] = useState('500');
  const [defaultCurrency, setDefaultCurrency] = useState('AED');

  const currencyOptions = [
    { value: 'AED', label: 'AED (UAE Dirham)' },
    { value: 'USD', label: 'USD (US Dollar)' },
    { value: 'USDT', label: 'USDT (Tether)' },
    { value: 'USDC', label: 'USDC (USD Coin)' }
  ];

  const handleSaveConfig = () => {
    console.log('Saving configuration:', {
      serviceFee,
      izraDiscount,
      minTreeSponsorship,
      maxTreeSponsorship,
      sellerAnnualFee,
      defaultCurrency
    });
  };

  const configSections = [
    {
      title: "Fee Structure",
      icon: "DollarSign",
      settings: [
        {
          label: "Platform Service Fee",
          description: "Percentage fee charged on all transactions",
          value: serviceFee,
          onChange: setServiceFee,
          type: "number",
          suffix: "%",
          min: "0",
          max: "10"
        },
        {
          label: "IZRA Token Payment Discount",
          description: "Discount percentage when paying with IZRA tokens",
          value: izraDiscount,
          onChange: setIzraDiscount,
          type: "number",
          suffix: "%",
          min: "0",
          max: "20"
        },
        {
          label: "Seller Annual Subscription Fee",
          description: "Annual fee for carbon credit sellers",
          value: sellerAnnualFee,
          onChange: setSellerAnnualFee,
          type: "number",
          prefix: "AED",
          min: "0"
        }
      ]
    },
    {
      title: "Tree Sponsorship Limits",
      icon: "TreePine",
      settings: [
        {
          label: "Minimum Trees per Sponsorship",
          description: "Minimum number of trees that can be sponsored",
          value: minTreeSponsorship,
          onChange: setMinTreeSponsorship,
          type: "number",
          suffix: "trees",
          min: "1"
        },
        {
          label: "Maximum Trees per Sponsorship",
          description: "Maximum number of trees that can be sponsored",
          value: maxTreeSponsorship,
          onChange: setMaxTreeSponsorship,
          type: "number",
          suffix: "trees",
          min: "1"
        }
      ]
    },
    {
      title: "Payment Gateway",
      icon: "CreditCard",
      settings: [
        {
          label: "Default Currency",
          description: "Primary currency displayed across the platform",
          value: defaultCurrency,
          onChange: setDefaultCurrency,
          type: "select",
          options: currencyOptions
        }
      ]
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Configuration Sections */}
      {configSections?.map((section, idx) => (
        <div key={idx} className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={section?.icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {section?.title}
            </h3>
          </div>

          <div className="space-y-6">
            {section?.settings?.map((setting, settingIdx) => (
              <div key={settingIdx} className="space-y-2">
                {setting?.type === 'select' ? (
                  <Select
                    label={setting?.label}
                    description={setting?.description}
                    options={setting?.options}
                    value={setting?.value}
                    onChange={setting?.onChange}
                  />
                ) : (
                  <div>
                    <Input
                      label={setting?.label}
                      description={setting?.description}
                      type={setting?.type}
                      value={setting?.value}
                      onChange={(e) => setting?.onChange(e?.target?.value)}
                      min={setting?.min}
                      max={setting?.max}
                    />
                    {(setting?.prefix || setting?.suffix) && (
                      <div className="flex items-center gap-2 mt-2">
                        {setting?.prefix && (
                          <span className="text-sm font-medium text-muted-foreground">
                            {setting?.prefix}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {setting?.value}
                        </span>
                        {setting?.suffix && (
                          <span className="text-sm font-medium text-muted-foreground">
                            {setting?.suffix}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Payment Gateway Status */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-success" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Payment Gateway Status
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">AED Gateway</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="CheckCircle2" size={12} />
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Mock payment gateway for AED transactions</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Crypto Gateway</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="CheckCircle2" size={12} />
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground">USDT, USDC, and IZRA token support</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Blockchain ESG Layer</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="CheckCircle2" size={12} />
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground">NFT minting and tracking enabled</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Verra Integration</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="CheckCircle2" size={12} />
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Carbon credit verification system</p>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          iconName="Save"
          iconPosition="left"
          onClick={handleSaveConfig}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default PlatformConfigTab;