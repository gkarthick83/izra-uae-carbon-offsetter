import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreditPortfolioTable = ({ credits, onViewNFT, onViewReceipt }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success',
      retired: 'bg-muted text-muted-foreground',
      pending: 'bg-warning/10 text-warning',
    };
    return colors?.[status] || colors?.active;
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Project</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tonnage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Purchase Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Verification</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {credits?.map((credit) => (
              <tr key={credit?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={credit?.projectImage}
                      alt={credit?.projectImageAlt}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">{credit?.projectName}</p>
                      <p className="text-xs text-muted-foreground">{credit?.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    <Icon name={credit?.typeIcon} size={14} />
                    {credit?.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-foreground">{credit?.tonnage} tCO₂</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{credit?.purchaseDate}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{credit?.verification}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(credit?.status)}`}>
                    <Icon name={credit?.status === 'retired' ? 'Lock' : 'CheckCircle'} size={14} />
                    {credit?.status?.charAt(0)?.toUpperCase() + credit?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewNFT(credit)}
                      aria-label="View NFT details"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="FileText"
                      onClick={() => onViewReceipt(credit)}
                      aria-label="View receipt"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {credits?.map((credit) => (
          <div key={credit?.id} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Image
                src={credit?.projectImage}
                alt={credit?.projectImageAlt}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                  {credit?.projectName}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">{credit?.location}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    <Icon name={credit?.typeIcon} size={12} />
                    {credit?.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(credit?.status)}`}>
                    <Icon name={credit?.status === 'retired' ? 'Lock' : 'CheckCircle'} size={12} />
                    {credit?.status?.charAt(0)?.toUpperCase() + credit?.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleRow(credit?.id)}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-primary"
            >
              <span>{expandedRow === credit?.id ? 'Hide Details' : 'View Details'}</span>
              <Icon name={expandedRow === credit?.id ? 'ChevronUp' : 'ChevronDown'} size={20} />
            </button>

            {expandedRow === credit?.id && (
              <div className="mt-3 space-y-3 pt-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tonnage</p>
                    <p className="font-semibold text-foreground">{credit?.tonnage} tCO₂</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Purchase Date</p>
                    <p className="text-sm text-foreground">{credit?.purchaseDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verification</p>
                  <div className="flex items-center gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{credit?.verification}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => onViewNFT(credit)}
                    fullWidth
                  >
                    View NFT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => onViewReceipt(credit)}
                    fullWidth
                  >
                    Receipt
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditPortfolioTable;