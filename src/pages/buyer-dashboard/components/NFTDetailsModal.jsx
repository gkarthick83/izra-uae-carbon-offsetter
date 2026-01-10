import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NFTDetailsModal = ({ nft, onClose }) => {
  if (!nft) return null;

  const metadataItems = [
    { label: 'Token ID', value: nft?.tokenId, icon: 'Hash' },
    { label: 'Registry ID', value: nft?.registryId, icon: 'FileText' },
    { label: 'Blockchain', value: nft?.blockchain, icon: 'Link' },
    { label: 'Mint Date', value: nft?.mintDate, icon: 'Calendar' },
    { label: 'Owner', value: nft?.owner, icon: 'User' },
    { label: 'Transferable', value: nft?.transferable ? 'Yes' : 'No', icon: 'Lock' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">NFT Details</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* NFT Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image
              src={nft?.image}
              alt={nft?.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                nft?.status === 'retired' ? 'bg-muted text-muted-foreground' : 'bg-success/10 text-success'
              }`}>
                <Icon name={nft?.status === 'retired' ? 'Lock' : 'CheckCircle'} size={14} />
                {nft?.status?.charAt(0)?.toUpperCase() + nft?.status?.slice(1)}
              </span>
            </div>
          </div>

          {/* Project Information */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              {nft?.projectName}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              {nft?.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium">
                <Icon name={nft?.typeIcon} size={16} />
                {nft?.type}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-secondary/10 text-secondary text-sm font-medium">
                <Icon name="MapPin" size={16} />
                {nft?.location}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-accent/10 text-accent text-sm font-medium">
                <Icon name="Weight" size={16} />
                {nft?.tonnage} tCO₂
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Blockchain Metadata
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metadataItems?.map((item, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={item?.icon} size={16} className="text-primary" />
                    <p className="text-xs md:text-sm text-muted-foreground">{item?.label}</p>
                  </div>
                  <p className="font-medium text-foreground text-sm md:text-base break-all">
                    {item?.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="bg-success/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="ShieldCheck" size={24} className="text-success flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-success mb-1">Verified Credit</h4>
                <p className="text-sm text-foreground">
                  This carbon credit has been verified by {nft?.verification} and is permanently recorded on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Link */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => window.open(nft?.blockchainUrl, '_blank')}
              fullWidth
            >
              View on Blockchain
            </Button>
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={onClose}
              fullWidth
            >
              Download Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsModal;