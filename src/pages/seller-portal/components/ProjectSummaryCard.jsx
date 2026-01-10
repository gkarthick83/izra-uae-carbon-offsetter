import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectSummaryCard = ({ project, onViewDetails, onManageCredits }) => {
  const getProjectTypeIcon = () => {
    switch (project?.type) {
      case 'mangrove':
        return 'TreePine';
      case 'solar':
        return 'Sun';
      case 'afforestation':
        return 'Trees';
      default:
        return 'Leaf';
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-smooth">
      <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            project?.location === 'UAE' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
          }`}>
            {project?.location}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            project?.status === 'active' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
          }`}>
            {project?.status === 'active' ? 'Active' : 'Pending'}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name={getProjectTypeIcon()} size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {project?.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
              {project?.region}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Available Credits</p>
            <p className="text-sm md:text-base font-semibold text-foreground">
              {project?.availableCredits?.toLocaleString()} tCO₂
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-sm md:text-base font-semibold text-success">
              AED {project?.totalRevenue?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onViewDetails(project?.id)}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth"
          >
            View Details
          </button>
          <button
            onClick={() => onManageCredits(project?.id)}
            className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth"
          >
            Manage Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;