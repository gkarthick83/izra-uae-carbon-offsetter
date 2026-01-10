import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import NavigationBreadcrumb from '../../../components/ui/NavigationBreadcrumb';

const KYCWorkflow = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    taxId: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    documents: []
  });

  const steps = [
    { id: 'company', label: 'Company Info', description: 'Basic company details' },
    { id: 'contact', label: 'Contact Details', description: 'Primary contact information' },
    { id: 'documents', label: 'Documents', description: 'Upload verification documents' },
    { id: 'review', label: 'Review', description: 'Confirm and submit' }
  ];

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Input
              label="Company Name"
              type="text"
              placeholder="Enter company name"
              value={formData?.companyName}
              onChange={(e) => handleChange('companyName', e?.target?.value)}
              required
            />
            <Input
              label="Registration Number"
              type="text"
              placeholder="Enter registration number"
              value={formData?.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e?.target?.value)}
              required
            />
            <Input
              label="Tax ID / VAT Number"
              type="text"
              placeholder="Enter tax identification"
              value={formData?.taxId}
              onChange={(e) => handleChange('taxId', e?.target?.value)}
              required
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Contact Person Name"
              type="text"
              placeholder="Enter full name"
              value={formData?.contactPerson}
              onChange={(e) => handleChange('contactPerson', e?.target?.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="contact@company.com"
              value={formData?.email}
              onChange={(e) => handleChange('email', e?.target?.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+971 XX XXX XXXX"
              value={formData?.phone}
              onChange={(e) => handleChange('phone', e?.target?.value)}
              required
            />
            <Input
              label="Business Address"
              type="text"
              placeholder="Enter complete address"
              value={formData?.address}
              onChange={(e) => handleChange('address', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={formData?.city}
                onChange={(e) => handleChange('city', e?.target?.value)}
                required
              />
              <Input
                label="Country"
                type="text"
                placeholder="Enter country"
                value={formData?.country}
                onChange={(e) => handleChange('country', e?.target?.value)}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-foreground mb-4">
                Required Documents
              </h4>
              <div className="space-y-4">
                {[
                  'Company Registration Certificate',
                  'Tax Registration Certificate',
                  'Authorized Signatory ID',
                  'Business License'
                ]?.map((doc, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:border-primary transition-smooth">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{doc}</p>
                      <Icon name="Upload" size={20} className="text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      PDF, JPG, PNG up to 5MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Paperclip"
                      iconPosition="left"
                      fullWidth
                    >
                      Choose File
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-4 md:p-6">
              <h4 className="text-base font-medium text-foreground mb-4">
                Company Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Name:</span>
                  <span className="text-foreground font-medium">{formData?.companyName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Number:</span>
                  <span className="text-foreground font-medium">{formData?.registrationNumber || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax ID:</span>
                  <span className="text-foreground font-medium">{formData?.taxId || 'Not provided'}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 md:p-6">
              <h4 className="text-base font-medium text-foreground mb-4">
                Contact Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Person:</span>
                  <span className="text-foreground font-medium">{formData?.contactPerson || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground font-medium">{formData?.email || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground font-medium">{formData?.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                By submitting this KYC application, you confirm that all information provided is accurate and complete. Our team will review your submission within 2-3 business days.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Shield" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            KYC Verification
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete verification to start selling carbon credits
          </p>
        </div>
      </div>
      <NavigationBreadcrumb steps={steps} currentStep={currentStep} />
      <div className="mt-6 md:mt-8">
        {renderStepContent()}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 pt-6 border-t border-border">
        {currentStep > 0 && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
          >
            Back
          </Button>
        )}
        <Button
          variant="default"
          size="lg"
          onClick={handleNext}
          iconName={currentStep === steps?.length - 1 ? 'Send' : 'ArrowRight'}
          iconPosition="right"
          fullWidth
        >
          {currentStep === steps?.length - 1 ? 'Submit Application' : 'Continue'}
        </Button>
        {currentStep === 0 && (
          <Button
            variant="ghost"
            size="lg"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default KYCWorkflow;