import React, { useState, useEffect } from 'react';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import UserManagementTab from './components/UserManagementTab';
import KYCApprovalsTab from './components/KYCApprovalsTab';
import ProjectApprovalsTab from './components/ProjectApprovalsTab';
import PlatformConfigTab from './components/PlatformConfigTab';
import ReportingDashboard from './components/ReportingDashboard';

const AdminConsole = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'kyc', label: 'KYC Approvals', icon: 'Shield' },
    { id: 'projects', label: 'Project Approvals', icon: 'FileCheck' },
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'kyc':
        return <KYCApprovalsTab />;
      case 'projects':
        return <ProjectApprovalsTab />;
      case 'config':
        return <PlatformConfigTab />;
      case 'reports':
        return <ReportingDashboard />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={true}
        userRole="admin"
        onLogout={handleLogout}
      />
      <main className="main-content">
        <div className="container-safe py-6 md:py-8">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                <Icon name="Shield" size={24} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Admin Console
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Comprehensive platform management and oversight
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center gap-2 mb-6 bg-card rounded-lg p-2 shadow-sm overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-smooth whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="text-sm">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon name={tabs?.find(t => t?.id === activeTab)?.icon || 'Users'} size={20} />
                <span className="text-sm font-medium text-foreground">
                  {tabs?.find(t => t?.id === activeTab)?.label}
                </span>
              </div>
              <Icon
                name={isMobileMenuOpen ? 'ChevronUp' : 'ChevronDown'}
                size={20}
                className="text-muted-foreground"
              />
            </button>

            {isMobileMenuOpen && (
              <div className="mt-2 bg-card rounded-lg shadow-lg overflow-hidden">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => {
                      setActiveTab(tab?.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="text-sm font-medium">{tab?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="transition-smooth">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConsole;