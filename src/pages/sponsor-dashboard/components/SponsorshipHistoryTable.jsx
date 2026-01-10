import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SponsorshipHistoryTable = ({ sponsorships, onDownloadCertificate }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'Planted': 'success',
      'Scheduled': 'warning',
      'Growing': 'primary',
      'Verified': 'secondary'
    };
    return colors?.[status] || 'muted';
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Trees</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">CO₂ Offset</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Certificate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sponsorships?.map((item) => (
              <tr key={item?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{item?.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item?.zone}</p>
                      <p className="text-xs text-muted-foreground">{item?.emirate}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{item?.trees}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item?.co2Offset} kg</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(item?.status)}/10 text-${getStatusColor(item?.status)}`}>
                    <Icon name="Circle" size={8} className="fill-current" />
                    {item?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => onDownloadCertificate(item?.certificateId)}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sponsorships?.map((item) => (
          <div key={item?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <p className="text-sm font-semibold text-foreground">{item?.zone}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item?.emirate}</p>
              </div>
              <button
                onClick={() => toggleRow(item?.id)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name={expandedRow === item?.id ? 'ChevronUp' : 'ChevronDown'} size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{item?.date}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(item?.status)}/10 text-${getStatusColor(item?.status)}`}>
                <Icon name="Circle" size={6} className="fill-current" />
                {item?.status}
              </span>
            </div>

            {expandedRow === item?.id && (
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trees Planted</span>
                  <span className="text-sm font-semibold text-foreground">{item?.trees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CO₂ Offset</span>
                  <span className="text-sm font-semibold text-foreground">{item?.co2Offset} kg</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => onDownloadCertificate(item?.certificateId)}
                  fullWidth
                >
                  Download Certificate
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorshipHistoryTable;