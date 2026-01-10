import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProjectApprovalsTab = () => {
  const [filterType, setFilterType] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
  {
    id: 1,
    name: "Dubai Mangrove Restoration Initiative",
    seller: "GreenTech Solutions Ltd",
    sellerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10df5a971-1765003957966.png",
    sellerAvatarAlt: "Professional woman with blonde hair in navy business suit smiling at camera",
    type: "Mangrove Restoration",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1566131976697-d334c1e3496a",
    imageAlt: "Lush green mangrove forest with dense vegetation along coastal waterway in Dubai",
    expectedCredits: "5,000 tonnes CO₂/year",
    verraId: "VCS-2024-1234",
    submissionDate: "2025-02-15",
    status: "pending",
    documents: ["Project Design", "Baseline Study", "Monitoring Plan"],
    description: `Comprehensive mangrove restoration project covering 50 hectares of coastal area in Dubai.\nFocuses on native species planting and long-term ecosystem monitoring.\nExpected to sequester significant carbon while providing habitat for marine life.`
  },
  {
    id: 2,
    name: "Abu Dhabi Solar Farm Project",
    seller: "UAE Eco Projects",
    sellerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1723d6ff3-1763294365385.png",
    sellerAvatarAlt: "Middle Eastern businessman with short black hair wearing white kandura and traditional headwear",
    type: "Solar Energy",
    location: "Abu Dhabi, UAE",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18363b4a5-1766183617080.png",
    imageAlt: "Large-scale solar panel installation with rows of photovoltaic panels under bright desert sun in Abu Dhabi",
    expectedCredits: "8,500 tonnes CO₂/year",
    verraId: "VCS-2024-5678",
    submissionDate: "2025-02-14",
    status: "under_review",
    documents: ["Project Design", "Technical Specifications", "Environmental Impact"],
    description: `Large-scale solar energy project generating clean electricity for Abu Dhabi.\n200 MW capacity with advanced photovoltaic technology.\nReduces reliance on fossil fuels and contributes to UAE's renewable energy targets.`
  },
  {
    id: 3,
    name: "Sharjah Afforestation Program",
    seller: "Renewable Energy Corp",
    sellerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c5b6918-1763294965734.png",
    sellerAvatarAlt: "Hispanic woman with long dark hair wearing professional gray blazer with confident smile",
    type: "Afforestation",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1592033203675-1de6b285c171",
    imageAlt: "Young tree saplings planted in organized rows across desert landscape with irrigation system in Sharjah",
    expectedCredits: "3,200 tonnes CO₂/year",
    verraId: "VCS-2024-9012",
    submissionDate: "2025-02-12",
    status: "approved",
    documents: ["Project Design", "Species Selection", "Water Management Plan"],
    description: `Desert afforestation initiative planting drought-resistant native species.\n100 hectares of previously barren land being transformed into green space.\nIncludes advanced irrigation systems and community engagement programs.`
  }];


  const typeOptions = [
  { value: 'all', label: 'All Project Types' },
  { value: 'Mangrove Restoration', label: 'Mangrove Restoration' },
  { value: 'Solar Energy', label: 'Solar Energy' },
  { value: 'Afforestation', label: 'Afforestation' }];


  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending Review', icon: 'Clock' },
      under_review: { color: 'bg-primary/10 text-primary', label: 'Under Review', icon: 'Eye' },
      approved: { color: 'bg-success/10 text-success', label: 'Approved', icon: 'CheckCircle2' },
      rejected: { color: 'bg-error/10 text-error', label: 'Rejected', icon: 'XCircle' }
    };
    return badges?.[status] || badges?.pending;
  };

  const filteredProjects = projects?.filter((project) =>
  filterType === 'all' || project?.type === filterType
  );

  const handleApprove = (projectId) => {
    console.log('Approving project:', projectId);
    setSelectedProject(null);
  };

  const handleReject = (projectId) => {
    console.log('Rejecting project:', projectId);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filter */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
        <Select
          options={typeOptions}
          value={filterType}
          onChange={setFilterType}
          placeholder="Filter by project type" />

      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredProjects?.map((project) => {
          const statusBadge = getStatusBadge(project?.status);
          return (
            <div
              key={project?.id}
              className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-smooth cursor-pointer"
              onClick={() => setSelectedProject(project)}>

              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={project?.image}
                  alt={project?.imageAlt}
                  className="w-full h-full object-cover" />

                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusBadge?.color} bg-card/90 backdrop-blur-sm`}>
                    <Icon name={statusBadge?.icon} size={14} />
                    {statusBadge?.label}
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {project?.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={project?.sellerAvatar}
                    alt={project?.sellerAvatarAlt}
                    className="w-8 h-8 rounded-full object-cover" />

                  <span className="text-sm text-muted-foreground">{project?.seller}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{project?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Leaf" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{project?.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Award" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{project?.expectedCredits}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Shield" size={16} className="text-muted-foreground" />
                    <span className="text-foreground font-mono">{project?.verraId}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="CheckCircle2"
                    iconPosition="left"
                    fullWidth
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleApprove(project?.id);
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
            </div>);

        })}
      </div>
      {/* Detailed Review Modal */}
      {selectedProject &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Project Review
              </h2>
              <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedProject(null)} />

            </div>

            <div className="p-4 md:p-6 space-y-6">
              {/* Project Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                src={selectedProject?.image}
                alt={selectedProject?.imageAlt}
                className="w-full h-full object-cover" />

              </div>

              {/* Project Info */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  {selectedProject?.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                  src={selectedProject?.sellerAvatar}
                  alt={selectedProject?.sellerAvatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedProject?.seller}</p>
                    <p className="text-xs text-muted-foreground">Project Owner</p>
                  </div>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MapPin" size={18} className="text-primary" />
                    <p className="text-xs text-muted-foreground">Location</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedProject?.location}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Leaf" size={18} className="text-primary" />
                    <p className="text-xs text-muted-foreground">Project Type</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedProject?.type}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Award" size={18} className="text-primary" />
                    <p className="text-xs text-muted-foreground">Expected Credits</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedProject?.expectedCredits}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Shield" size={18} className="text-primary" />
                    <p className="text-xs text-muted-foreground">Verra Registry ID</p>
                  </div>
                  <p className="text-sm font-medium text-foreground font-mono">{selectedProject?.verraId}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-3">
                  Project Description
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedProject?.description}
                </p>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-3">
                  Submitted Documents
                </h4>
                <div className="space-y-2">
                  {selectedProject?.documents?.map((doc, idx) =>
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="FileText" size={20} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">{doc}</span>
                      </div>
                      <Button variant="outline" size="sm" iconName="Download">
                        View
                      </Button>
                    </div>
                )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                variant="default"
                size="lg"
                iconName="CheckCircle2"
                iconPosition="left"
                fullWidth
                onClick={() => handleApprove(selectedProject?.id)}>

                  Approve Project
                </Button>
                <Button
                variant="destructive"
                size="lg"
                iconName="XCircle"
                iconPosition="left"
                fullWidth
                onClick={() => handleReject(selectedProject?.id)}>

                  Reject Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ProjectApprovalsTab;