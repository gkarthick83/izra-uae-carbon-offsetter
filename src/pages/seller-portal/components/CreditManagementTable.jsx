import React from 'react';
import Icon from '../../../components/AppIcon';


const CreditManagementTable = ({ credits, onEditPrice, onConvertToNFT, onViewDetails }) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Credit Management
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage pricing and NFT conversion for your carbon credits
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-foreground">
                Project
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-foreground">
                Available
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-foreground">
                Price (AED)
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-foreground">
                NFT Status
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {credits?.map((credit) => (
              <tr key={credit?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Leaf" size={20} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {credit?.projectName}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {credit?.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {credit?.available?.toLocaleString()} tCO₂
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {credit?.priceAED?.toLocaleString()}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    credit?.nftStatus === 'converted' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                  }`}>
                    {credit?.nftStatus === 'converted' ? 'NFT Ready' : 'Not Converted'}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditPrice(credit?.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-smooth"
                      aria-label="Edit price"
                    >
                      <Icon name="Edit2" size={16} className="text-foreground" />
                    </button>
                    {credit?.nftStatus !== 'converted' && (
                      <button
                        onClick={() => onConvertToNFT(credit?.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-smooth"
                        aria-label="Convert to NFT"
                      >
                        <Icon name="Coins" size={16} className="text-primary" />
                      </button>
                    )}
                    <button
                      onClick={() => onViewDetails(credit?.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-smooth"
                      aria-label="View details"
                    >
                      <Icon name="Eye" size={16} className="text-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {credits?.length === 0 && (
        <div className="p-8 md:p-12 text-center">
          <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-foreground font-medium mb-2">No Credits Available</p>
          <p className="text-sm text-muted-foreground">
            Register a project to start managing carbon credits
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditManagementTable;