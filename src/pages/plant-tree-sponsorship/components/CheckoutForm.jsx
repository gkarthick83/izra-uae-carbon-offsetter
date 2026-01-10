import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CheckoutForm = ({ emirate, zone, packageData, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: '',
    currency: 'AED',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { value: 'usdt', label: 'USDT (Tether)', icon: 'DollarSign' },
    { value: 'usdc', label: 'USDC (USD Coin)', icon: 'DollarSign' },
    { value: 'izra', label: 'IZRA Token (10% Discount)', icon: 'Coins' }
  ];

  const currencyOptions = [
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'USDT', label: 'USDT - Tether' },
    { value: 'USDC', label: 'USDC - USD Coin' },
    { value: 'IZRA', label: 'IZRA - IZRA Token' }
  ];

  const calculatePrice = () => {
    const basePrice = packageData?.priceAED;
    const serviceFee = formData?.paymentMethod === 'izra' ? 0 : basePrice * 0.02;
    const discount = formData?.paymentMethod === 'izra' ? basePrice * 0.10 : 0;
    const total = basePrice + serviceFee - discount;

    return {
      basePrice,
      serviceFee,
      discount,
      total
    };
  };

  const convertCurrency = (amountAED) => {
    const rates = {
      AED: 1,
      USD: 0.272,
      USDT: 0.272,
      USDC: 0.272,
      IZRA: 0.544
    };
    return (amountAED * rates?.[formData?.currency])?.toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const certificateData = {
        ...formData,
        emirate,
        zone,
        packageData,
        pricing: calculatePrice(),
        certificateId: `IZRA-${Date.now()}`,
        plantingDate: new Date()?.toISOString(),
        coordinates: {
          lat: 24.4539 + Math.random() * 0.1,
          lng: 54.3773 + Math.random() * 0.1
        }
      };

      onComplete(certificateData);
      setIsProcessing(false);
    }, 2000);
  };

  const pricing = calculatePrice();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
          Complete Your Sponsorship
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Enter your details and select payment method to finalize your tree sponsorship
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-xl p-6 ring-1 ring-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="User" size={20} className="text-primary" />
                Personal Information
              </h3>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData?.fullName}
                  onChange={handleInputChange}
                  error={errors?.fullName}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+971 XX XXX XXXX"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  error={errors?.phone}
                  required
                />
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 ring-1 ring-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="CreditCard" size={20} className="text-primary" />
                Payment Method
              </h3>

              <div className="space-y-4">
                <Select
                  label="Select Currency"
                  options={currencyOptions}
                  value={formData?.currency}
                  onChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods?.map((method) => (
                    <button
                      key={method?.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method?.value }))}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-smooth ${
                        formData?.paymentMethod === method?.value
                          ? 'ring-2 ring-primary bg-primary/5' :'ring-1 ring-border hover:ring-2 hover:ring-primary/50'
                      }`}
                    >
                      <Icon name={method?.icon} size={24} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{method?.label}</span>
                      {formData?.paymentMethod === method?.value && (
                        <Icon name="Check" size={20} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>

                {errors?.paymentMethod && (
                  <p className="text-sm text-error">{errors?.paymentMethod}</p>
                )}

                {formData?.paymentMethod === 'izra' && (
                  <div className="bg-success/10 rounded-lg p-4 flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success mb-1">
                        IZRA Token Benefits
                      </p>
                      <p className="text-xs text-success/80">
                        Pay with IZRA tokens to receive 10% discount and zero service fees
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 ring-1 ring-border">
              <Checkbox
                label="I agree to the terms and conditions"
                description="By checking this box, you agree to our sponsorship terms, privacy policy, and environmental impact reporting guidelines."
                checked={formData?.agreeTerms}
                onChange={handleInputChange}
                name="agreeTerms"
                error={errors?.agreeTerms}
                required
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isProcessing}
              disabled={isProcessing}
              iconName="Lock"
              iconPosition="left"
              fullWidth
            >
              {isProcessing ? 'Processing Payment...' : 'Complete Sponsorship'}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 ring-1 ring-border sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Location</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {zone?.name}, {emirate?.name}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TreePine" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Package</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {packageData?.trees} Mangrove Trees
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Leaf" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">CO₂ Impact</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {packageData?.co2Annual} annually
                </p>
                <p className="text-sm text-muted-foreground">
                  {packageData?.co2Lifetime} lifetime
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground">
                  {formData?.currency} {convertCurrency(pricing?.basePrice)}
                </span>
              </div>

              {pricing?.serviceFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee (2%):</span>
                  <span className="font-medium text-foreground">
                    {formData?.currency} {convertCurrency(pricing?.serviceFee)}
                  </span>
                </div>
              )}

              {pricing?.discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>IZRA Discount (10%):</span>
                  <span className="font-medium">
                    -{formData?.currency} {convertCurrency(pricing?.discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">
                  {formData?.currency} {convertCurrency(pricing?.total)}
                </span>
              </div>
            </div>

            <div className="mt-6 bg-primary/5 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Icon name="Shield" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your payment is secured with blockchain transparency. Certificate will be generated immediately after payment confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;