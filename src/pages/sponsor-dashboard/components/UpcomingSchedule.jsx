import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSchedule = ({ schedules }) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Upcoming Plantings</h3>
          <Icon name="CalendarClock" size={20} className="text-warning" />
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        {schedules?.map((schedule) => (
          <div key={schedule?.id} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-warning/10 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs text-warning font-medium">{schedule?.month}</span>
                <span className="text-2xl font-bold text-warning">{schedule?.day}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-foreground mb-1">{schedule?.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={14} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{schedule?.location}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="TreePine" size={12} />
                    {schedule?.trees} trees
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {schedule?.time}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                className="hidden md:flex"
              >
                Add to Calendar
              </Button>
            </div>
          </div>
        ))}

        {schedules?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No upcoming plantings scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSchedule;