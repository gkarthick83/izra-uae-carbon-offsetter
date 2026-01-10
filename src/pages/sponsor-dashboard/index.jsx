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
    value: '145',
    unit: 'trees',
    trend: 'up',
    trendValue: '+12%',
    color: 'primary'
  },
  {
    icon: 'Leaf',
    title: 'CO₂ Offset Achieved',
    value: '1,856',
    unit: 'kg',
    trend: 'up',
    trendValue: '+8%',
    color: 'success'
  },
  {
    icon: 'MapPin',
    title: 'Emirates Covered',
    value: '5',
    unit: 'locations',
    color: 'secondary'
  },
  {
    icon: 'Award',
    title: 'Certificates Earned',
    value: '8',
    unit: 'certificates',
    color: 'accent'
  }];


  const sponsorshipHistory = [
  {
    id: 1,
    date: '15/12/2024',
    emirate: 'Abu Dhabi',
    zone: 'Al Wathba Wetland Reserve',
    trees: 20,
    co2Offset: 256,
    status: 'Growing',
    certificateId: 'CERT-2024-001'
  },
  {
    id: 2,
    date: '28/11/2024',
    emirate: 'Dubai',
    zone: 'Ras Al Khor Wildlife Sanctuary',
    trees: 10,
    co2Offset: 128,
    status: 'Planted',
    certificateId: 'CERT-2024-002'
  },
  {
    id: 3,
    date: '10/11/2024',
    emirate: 'Sharjah',
    zone: 'Khor Kalba Conservation Reserve',
    trees: 15,
    co2Offset: 192,
    status: 'Verified',
    certificateId: 'CERT-2024-003'
  },
  {
    id: 4,
    date: '22/10/2024',
    emirate: 'Ajman',
    zone: 'Ajman Coastal Mangrove Area',
    trees: 20,
    co2Offset: 256,
    status: 'Growing',
    certificateId: 'CERT-2024-004'
  },
  {
    id: 5,
    date: '05/10/2024',
    emirate: 'Umm Al Quwain',
    zone: 'Umm Al Quwain Marine Reserve',
    trees: 10,
    co2Offset: 128,
    status: 'Planted',
    certificateId: 'CERT-2024-005'
  }];


  const mapLocations = [
  {
    id: 1,
    emirate: 'Abu Dhabi',
    zone: 'Al Wathba Wetland Reserve',
    trees: 20,
    status: 'Growing',
    plantingDate: '15/12/2024',
    co2Offset: 256,
    growthProgress: 75,
    image: "https://images.unsplash.com/photo-1554917581-d6e28ef0ef67",
    imageAlt: 'Lush green mangrove forest with dense foliage in wetland reserve showing healthy growth and biodiversity',
    monitoringNote: 'Trees showing excellent growth with 98% survival rate. Regular monitoring confirms healthy root development.'
  },
  {
    id: 2,
    emirate: 'Dubai',
    zone: 'Ras Al Khor Wildlife Sanctuary',
    trees: 10,
    status: 'Planted',
    plantingDate: '28/11/2024',
    co2Offset: 128,
    growthProgress: 45,
    image: "https://images.unsplash.com/photo-1637641506646-3506820bb2c3",
    imageAlt: 'Young mangrove saplings planted in coastal wetland with clear water and sandy substrate',
    monitoringNote: 'Recently planted saplings establishing root systems. Initial growth indicators are positive.'
  },
  {
    id: 3,
    emirate: 'Sharjah',
    zone: 'Khor Kalba Conservation Reserve',
    trees: 15,
    status: 'Verified',
    plantingDate: '10/11/2024',
    co2Offset: 192,
    growthProgress: 90,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf92d57-1765333913332.png",
    imageAlt: 'Mature mangrove trees with extensive root systems in protected conservation area with thriving ecosystem',
    monitoringNote: 'Verified by environmental partners. Trees have reached maturity stage with optimal carbon sequestration.'
  }];


  const certificates = [
  {
    id: 1,
    certificateId: 'CERT-2024-001',
    title: 'Mangrove Sponsorship Certificate',
    location: 'Al Wathba Wetland Reserve, Abu Dhabi',
    date: '15/12/2024',
    trees: 20,
    co2Offset: '256 kg',
    verified: true,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2278939-1766400237535.png",
    thumbnailAlt: 'Professional certificate design with green border featuring mangrove tree illustration and IZRA logo',
    fullImage: "https://img.rocket.new/generatedImages/rocket_gen_img_115ed46de-1764886392793.png",
    fullImageAlt: 'Complete digital certificate showing sponsorship details, QR code verification, and environmental impact metrics'
  },
  {
    id: 2,
    certificateId: 'CERT-2024-002',
    title: 'Mangrove Sponsorship Certificate',
    location: 'Ras Al Khor Wildlife Sanctuary, Dubai',
    date: '28/11/2024',
    trees: 10,
    co2Offset: '128 kg',
    verified: true,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1cbcfd891-1765447025671.png",
    thumbnailAlt: 'Elegant certificate with blue coastal theme displaying tree sponsorship information and verification seal',
    fullImage: "https://img.rocket.new/generatedImages/rocket_gen_img_115ed46de-1764886392793.png",
    fullImageAlt: 'Full certificate document with detailed planting location, date, and blockchain verification code'
  },
  {
    id: 3,
    certificateId: 'CERT-2024-003',
    title: 'Mangrove Sponsorship Certificate',
    location: 'Khor Kalba Conservation Reserve, Sharjah',
    date: '10/11/2024',
    trees: 15,
    co2Offset: '192 kg',
    verified: true,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_117cc9ef1-1764668331007.png",
    thumbnailAlt: 'Premium certificate design with gold accents showing conservation reserve sponsorship details',
    fullImage: "https://img.rocket.new/generatedImages/rocket_gen_img_166ad9d5d-1764637482414.png",
    fullImageAlt: 'Official certificate with environmental impact summary, sponsor name, and digital signature'
  }];


  const activities = [
  {
    id: 1,
    type: 'planting',
    title: 'New Trees Planted',
    description: '20 mangrove trees successfully planted at Al Wathba Wetland Reserve',
    time: '2 hours ago',
    details: [
    { icon: 'TreePine', value: '20 trees' },
    { icon: 'MapPin', value: 'Abu Dhabi' }]

  },
  {
    id: 2,
    type: 'monitoring',
    title: 'Growth Monitoring Update',
    description: 'Your sponsored trees at Ras Al Khor show 98% survival rate with healthy growth',
    time: '1 day ago',
    details: [
    { icon: 'Activity', value: '98% survival' },
    { icon: 'TrendingUp', value: '+15% growth' }]

  },
  {
    id: 3,
    type: 'certificate',
    title: 'Certificate Generated',
    description: 'Digital certificate for your Sharjah sponsorship is now available',
    time: '3 days ago',
    details: [
    { icon: 'Award', value: 'Certificate' },
    { icon: 'Download', value: 'Download PDF' }]

  },
  {
    id: 4,
    type: 'milestone',
    title: 'Milestone Achieved',
    description: 'Congratulations! You have offset 1,000 kg of CO₂ through your sponsorships',
    time: '5 days ago',
    details: [
    { icon: 'Leaf', value: '1,000 kg CO₂' },
    { icon: 'Trophy', value: 'Milestone' }]

  },
  {
    id: 5,
    type: 'verification',
    title: 'Verification Complete',
    description: 'Environmental partners verified your Khor Kalba sponsorship',
    time: '1 week ago',
    details: [
    { icon: 'CheckCircle2', value: 'Verified' },
    { icon: 'Shield', value: 'Certified' }]

  }];


  const upcomingSchedule = [
  {
    id: 1,
    day: '28',
    month: 'DEC',
    title: 'Scheduled Planting',
    location: 'Fujairah Coastal Reserve',
    trees: 10,
    time: '09:00 AM'
  },
  {
    id: 2,
    day: '05',
    month: 'JAN',
    title: 'Monitoring Visit',
    location: 'Al Wathba Wetland Reserve',
    trees: 20,
    time: '10:30 AM'
  }];


  const projectionData = [
  { year: '2025', co2Offset: 1856, treeGrowth: 100 },
  { year: '2026', co2Offset: 2245, treeGrowth: 145 },
  { year: '2027', co2Offset: 2680, treeGrowth: 198 },
  { year: '2028', co2Offset: 3150, treeGrowth: 256 },
  { year: '2029', co2Offset: 3720, treeGrowth: 320 }];


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