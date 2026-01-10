import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProjectRegistrationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    location: '',
    region: '',
    emirate: '',
    country: '',
    verraRegistryId: '',
    totalCredits: '',
    priceAED: '',
    priceUSD: '',
    priceUSDT: '',
    description: '',
    documents: []
  });

  const [errors, setErrors] = useState({});

  const projectTypes = [
    { value: 'mangrove', label: 'Mangrove Restoration' },
    { value: 'solar', label: 'Solar Energy' },
    { value: 'afforestation', label: 'Afforestation' }
  ];

  const locationTypes = [
    { value: 'UAE', label: 'UAE' },
    { value: 'International', label: 'International' }
  ];

  const uaeEmirates = [
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'ajman', label: 'Ajman' },
    { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
    { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
    { value: 'fujairah', label: 'Fujairah' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.projectName?.trim()) newErrors.projectName = 'Project name is required';
    if (!formData?.projectType) newErrors.projectType = 'Project type is required';
    if (!formData?.location) newErrors.location = 'Location type is required';
    if (formData?.location === 'UAE' && !formData?.emirate) newErrors.emirate = 'Emirate is required';
    if (formData?.location === 'International' && !formData?.country?.trim()) newErrors.country = 'Country is required';
    if (!formData?.verraRegistryId?.trim()) newErrors.verraRegistryId = 'Verra Registry ID is required';
    if (!formData?.totalCredits || formData?.totalCredits <= 0) newErrors.totalCredits = 'Valid credit amount required';
    if (!formData?.priceAED || formData?.priceAED <= 0) newErrors.priceAED = 'Valid AED price required';
    if (!formData?.description?.trim()) newErrors.description = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="FileText" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Register New Project
          </h3>
          <p className="text-sm text-muted-foreground">
            Submit your carbon credit project for approval
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Project Name"
            type="text"
            placeholder="Enter project name"
            value={formData?.projectName}
            onChange={(e) => handleChange('projectName', e?.target?.value)}
            error={errors?.projectName}
            required
          />

          <Select
            label="Project Type"
            placeholder="Select project type"
            options={projectTypes}
            value={formData?.projectType}
            onChange={(value) => handleChange('projectType', value)}
            error={errors?.projectType}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Location Type"
            placeholder="Select location"
            options={locationTypes}
            value={formData?.location}
            onChange={(value) => handleChange('location', value)}
            error={errors?.location}
            required
          />

          {formData?.location === 'UAE' ? (
            <Select
              label="Emirate"
              placeholder="Select emirate"
              options={uaeEmirates}
              value={formData?.emirate}
              onChange={(value) => handleChange('emirate', value)}
              error={errors?.emirate}
              required
            />
          ) : formData?.location === 'International' ? (
            <Input
              label="Country"
              type="text"
              placeholder="Enter country name"
              value={formData?.country}
              onChange={(e) => handleChange('country', e?.target?.value)}
              error={errors?.country}
              required
            />
          ) : null}
        </div>

        <Input
          label="Region/Area"
          type="text"
          placeholder="Enter specific region or area"
          value={formData?.region}
          onChange={(e) => handleChange('region', e?.target?.value)}
          description="Specific location within the selected area"
        />

        <Input
          label="Verra Registry ID"
          type="text"
          placeholder="Enter Verra Registry ID"
          value={formData?.verraRegistryId}
          onChange={(e) => handleChange('verraRegistryId', e?.target?.value)}
          error={errors?.verraRegistryId}
          description="Official Verra verification registry identification number"
          required
        />

        <Input
          label="Total Carbon Credits (tCO₂)"
          type="number"
          placeholder="Enter total credits"
          value={formData?.totalCredits}
          onChange={(e) => handleChange('totalCredits', e?.target?.value)}
          error={errors?.totalCredits}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Price per Credit (AED)"
            type="number"
            placeholder="0.00"
            value={formData?.priceAED}
            onChange={(e) => handleChange('priceAED', e?.target?.value)}
            error={errors?.priceAED}
            required
          />

          <Input
            label="Price per Credit (USD)"
            type="number"
            placeholder="0.00"
            value={formData?.priceUSD}
            onChange={(e) => handleChange('priceUSD', e?.target?.value)}
            description="Optional - auto-calculated if empty"
          />

          <Input
            label="Price per Credit (USDT)"
            type="number"
            placeholder="0.00"
            value={formData?.priceUSDT}
            onChange={(e) => handleChange('priceUSDT', e?.target?.value)}
            description="Optional - auto-calculated if empty"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Description *
          </label>
          <textarea
            value={formData?.description}
            onChange={(e) => handleChange('description', e?.target?.value)}
            placeholder="Provide detailed information about your carbon credit project..."
            rows={6}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          {errors?.description && (
            <p className="mt-1 text-sm text-error">{errors?.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary transition-smooth cursor-pointer">
            <Icon name="Upload" size={32} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX up to 10MB each
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="Send"
            iconPosition="right"
            fullWidth
          >
            Submit for Approval
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectRegistrationForm;