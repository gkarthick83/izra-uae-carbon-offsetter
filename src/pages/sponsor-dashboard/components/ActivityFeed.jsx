import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'planting': 'TreePine',
      'monitoring': 'Activity',
      'milestone': 'Award',
      'certificate': 'FileCheck',
      'verification': 'CheckCircle2'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'planting': 'primary',
      'monitoring': 'secondary',
      'milestone': 'accent',
      'certificate': 'success',
      'verification': 'success'
    };
    return colors?.[type] || 'muted';
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-primary" />
        </div>
      </div>
      <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 md:p-6 hover:bg-muted/30 transition-smooth">
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-${getActivityColor(activity?.type)}/10 flex items-center justify-center`}>
                <Icon name={getActivityIcon(activity?.type)} size={20} className={`text-${getActivityColor(activity?.type)}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm md:text-base font-semibold text-foreground line-clamp-2">{activity?.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity?.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{activity?.description}</p>

                {activity?.details && (
                  <div className="flex flex-wrap gap-2">
                    {activity?.details?.map((detail, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-foreground">
                        <Icon name={detail?.icon} size={12} />
                        {detail?.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;