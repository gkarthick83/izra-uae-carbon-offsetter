import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Button from '../../components/ui/Button';

import ImpactSummaryCard from './components/ImpactSummaryCard';
import SponsorshipHistoryTable from './components/SponsorshipHistoryTable';
import UAEMapVisualization from './components/UAEMapVisualization';
import CertificateGallery from './components/CertificateGallery';
import ActivityFeed from './components/ActivityFeed';
import UpcomingSchedule from './components/UpcomingSchedule';
import ImpactProjections from './components/ImpactProjections';

const SponsorDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const impactSummary = [
  {
    icon: 'TreePine',
    title: 'Total Trees Sponsored',
    value: '0',
    unit: 'trees',
    trend: null,
    trendValue: null,
    color: 'primary'
  },
  {
    icon: 'Leaf',
    title: 'CO₂ Offset Achieved',
    value: '0',
    unit: 'kg',
    trend: null,
    trendValue: null,
    color: 'success'
  },
  {
    icon: 'MapPin',
    title: 'Emirates Covered',
    value: '0',
    unit: 'locations',
    color: 'secondary'
  },
  {
    icon: 'Award',
    title: 'Certificates Earned',
    value: '0',
    unit: 'certificates',
    color: 'accent'
  }];


  const sponsorshipHistory = [];


  const mapLocations = [];

  const certificates = [];

  const activities = [];

  const upcomingSchedule = [];

  const projectionData = [];

  const handleDownloadCertificate = (certificateId) => {
    console.log('Downloading certificate:', certificateId);
    alert(`Certificate ${certificateId} download started`);
  };

  const handleShareCertificate = (certificateId) => {
    console.log('Sharing certificate:', certificateId);
    alert(`Share options for certificate ${certificateId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={true}
        userRole="sponsor"
        onLogout={handleLogout} />

      <main className="main-content">
        <div className="container-safe py-6 md:py-8 lg:py-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {currentLanguage === 'ar' ? 'لوحة تحكم الراعي' : 'Sponsor Dashboard'}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {currentLanguage === 'ar' ? 'تتبع رعاياتك وتأثيرك البيئي' : 'Track your sponsorships and environmental impact'}
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/plant-tree-sponsorship')}>

              {currentLanguage === 'ar' ? 'رعاية أشجار جديدة' : 'Sponsor New Trees'}
            </Button>
          </div>

          {/* Impact Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {impactSummary?.map((item, index) =>
            <ImpactSummaryCard key={index} {...item} />
            )}
          </div>

          {/* Sponsorship History */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                {currentLanguage === 'ar' ? 'سجل الرعاية' : 'Sponsorship History'}
              </h2>
              <Button variant="ghost" size="sm" iconName="Download">
                {currentLanguage === 'ar' ? 'تصدير' : 'Export'}
              </Button>
            </div>
            <SponsorshipHistoryTable
              sponsorships={sponsorshipHistory}
              onDownloadCertificate={handleDownloadCertificate} />

          </div>

          {/* UAE Map Visualization */}
          <div className="mb-6 md:mb-8">
            <UAEMapVisualization locations={mapLocations} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Certificate Gallery - Takes 2 columns */}
            <div className="lg:col-span-2">
              <CertificateGallery
                certificates={certificates}
                onDownload={handleDownloadCertificate}
                onShare={handleShareCertificate} />

            </div>

            {/* Activity Feed - Takes 1 column */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={activities} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Impact Projections - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ImpactProjections projectionData={projectionData} />
            </div>

            {/* Upcoming Schedule - Takes 1 column */}
            <div className="lg:col-span-1">
              <UpcomingSchedule schedules={upcomingSchedule} />
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default SponsorDashboard;