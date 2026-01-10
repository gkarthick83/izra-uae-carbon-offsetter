import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const KYCApprovalsTab = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const kycApplications = [
  {
    id: 1,
    applicantName: "Sarah Johnson",
    email: "sarah.j@greentech.com",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10df5a971-1765003957966.png",
    avatarAlt: "Professional woman with blonde hair in navy business suit smiling at camera",
    companyName: "GreenTech Solutions Ltd",
    submissionDate: "2025-02-10",
    documents: [
    { type: "Trade License", url: "#", status: "verified" },
    { type: "Tax Registration", url: "#", status: "verified" },
    { type: "Bank Statement", url: "#", status: "pending" },
    { type: "Director ID", url: "#", status: "verified" }],

    projectTypes: ["Mangrove Restoration", "Solar Energy"],
    expectedCredits: "5,000 tonnes CO₂/year",
    status: "pending"
  },
  {
    id: 2,
    applicantName: "Ahmed Al Rashid",
    email: "ahmed.r@ecoprojects.ae",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1723d6ff3-1763294365385.png",
    avatarAlt: "Middle Eastern businessman with short black hair wearing white kandura and traditional headwear",
    companyName: "UAE Eco Projects",
    submissionDate: "2025-02-12",
    documents: [
    { type: "Trade License", url: "#", status: "verified" },
    { type: "Tax Registration", url: "#", status: "verified" },
    { type: "Bank Statement", url: "#", status: "verified" },
    { type: "Director ID", url: "#", status: "verified" }],

    projectTypes: ["Afforestation"],
    expectedCredits: "3,200 tonnes CO₂/year",
    status: "pending"
  },
  {
    id: 3,
    applicantName: "Maria Garcia",
    email: "m.garcia@renewable.com",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c5b6918-1763294965734.png",
    avatarAlt: "Hispanic woman with long dark hair wearing professional gray blazer with confident smile",
    companyName: "Renewable Energy Corp",
    submissionDate: "2025-02-08",
    documents: [
    { type: "Trade License", url: "#", status: "rejected" },
    { type: "Tax Registration", url: "#", status: "verified" },
    { type: "Bank Statement", url: "#", status: "pending" },
    { type: "Director ID", url: "#", status: "verified" }],

    projectTypes: ["Solar Energy", "Wind Energy"],
    expectedCredits: "8,500 tonnes CO₂/year",
    status: "under_review"
  }];


  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending Review' },
      under_review: { color: 'bg-primary/10 text-primary', label: 'Under Review' },
      verified: { color: 'bg-success/10 text-success', label: 'Verified' },
      rejected: { color: 'bg-error/10 text-error', label: 'Rejected' }
    };
    return badges?.[status] || badges?.pending;
  };

  const getDocumentStatusIcon = (status) => {
    const icons = {
      verified: { name: 'CheckCircle2', color: 'text-success' },
      pending: { name: 'Clock', color: 'text-warning' },
      rejected: { name: 'XCircle', color: 'text-error' }
    };
    return icons?.[status] || icons?.pending;
  };

  const handleApprove = (applicationId) => {
    console.log('Approving application:', applicationId);
    setSelectedApplication(null);
  };

  const handleReject = (applicationId) => {
    if (!rejectionReason?.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    console.log('Rejecting application:', applicationId, 'Reason:', rejectionReason);
    setRejectionReason('');
    setSelectedApplication(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Applications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {kycApplications?.map((application) =>
        <div
          key={application?.id}
          className="bg-card rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth cursor-pointer"
          onClick={() => setSelectedApplication(application)}>

            <div className="flex items-start gap-4 mb-4">
              <Image
              src={application?.avatar}
              alt={application?.avatarAlt}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />

              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  {application?.applicantName}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{application?.companyName}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(application?.status)?.color}`}>
                  {getStatusBadge(application?.status)?.label}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Submitted:</span>
                <span className="text-foreground font-medium">
                  {new Date(application.submissionDate)?.toLocaleDateString('en-GB')}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Project Types:</span>
                <span className="text-foreground font-medium text-right">
                  {application?.projectTypes?.join(', ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expected Credits:</span>
                <span className="text-foreground font-medium">{application?.expectedCredits}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Documents Status:</p>
                <div className="grid grid-cols-2 gap-2">
                  {application?.documents?.map((doc, idx) => {
                  const statusIcon = getDocumentStatusIcon(doc?.status);
                  return (
                    <div key={idx} className="flex items-center gap-2">
                        <Icon name={statusIcon?.name} size={14} className={statusIcon?.color} />
                        <span className="text-xs text-foreground">{doc?.type}</span>
                      </div>);

                })}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
              variant="default"
              size="sm"
              iconName="CheckCircle2"
              iconPosition="left"
              fullWidth
              onClick={(e) => {
                e?.stopPropagation();
                handleApprove(application?.id);
              }}>

                Approve
              </Button>
              <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              fullWidth>

                Review
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Detailed Review Modal */}
      {selectedApplication &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                KYC Application Review
              </h2>
              <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedApplication(null)} />

            </div>

            <div className="p-4 md:p-6 space-y-6">
              {/* Applicant Info */}
              <div className="flex items-start gap-4">
                <Image
                src={selectedApplication?.avatar}
                alt={selectedApplication?.avatarAlt}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                    {selectedApplication?.applicantName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedApplication?.email}</p>
                  <p className="text-base font-medium text-foreground">{selectedApplication?.companyName}</p>
                </div>
              </div>

              {/* Documents Review */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
                  Submitted Documents
                </h4>
                <div className="space-y-3">
                  {selectedApplication?.documents?.map((doc, idx) => {
                  const statusIcon = getDocumentStatusIcon(doc?.status);
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name={statusIcon?.name} size={20} className={statusIcon?.color} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc?.type}</p>
                            <p className="text-xs text-muted-foreground capitalize">{doc?.status}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" iconName="Download">
                          View
                        </Button>
                      </div>);

                })}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
                  Project Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Project Types</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedApplication?.projectTypes?.join(', ')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Expected Annual Credits</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedApplication?.expectedCredits}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              <div>
                <Input
                label="Rejection Reason (if applicable)"
                type="text"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e?.target?.value)}
                description="This will be sent to the applicant" />

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                variant="default"
                size="lg"
                iconName="CheckCircle2"
                iconPosition="left"
                fullWidth
                onClick={() => handleApprove(selectedApplication?.id)}>

                  Approve Application
                </Button>
                <Button
                variant="destructive"
                size="lg"
                iconName="XCircle"
                iconPosition="left"
                fullWidth
                onClick={() => handleReject(selectedApplication?.id)}>

                  Reject Application
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default KYCApprovalsTab;