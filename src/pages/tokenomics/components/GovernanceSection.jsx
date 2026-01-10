import React from 'react';
import Icon from '../../../components/AppIcon';

const GovernanceSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Governance Participation",
      subtitle: "Shape the Future of IZRA Platform",
      description: "IZRA token holders have direct influence over platform decisions through decentralized governance.",
      votingMechanics: [
        {
          icon: "Vote",
          title: "Voting Rights",
          description: "1 IZRA token = 1 vote on all governance proposals"
        },
        {
          icon: "FileText",
          title: "Proposal Submission",
          description: "Holders with 10,000+ IZRA can submit governance proposals"
        },
        {
          icon: "Users",
          title: "Community Decisions",
          description: "Vote on project approvals, fee structures, and platform upgrades"
        }
      ],
      recentProposals: [
        {
          title: "Reduce marketplace fees from 2% to 1.8%",
          status: "Passed",
          votes: "2.5M IZRA",
          result: "approved"
        },
        {
          title: "Add new Emirates to tree planting zones",
          status: "Active",
          votes: "1.8M IZRA",
          result: "voting"
        },
        {
          title: "Increase staking rewards pool allocation",
          status: "Pending",
          votes: "0.5M IZRA",
          result: "pending"
        }
      ]
    },
    ar: {
      title: "المشاركة في الحوكمة",
      subtitle: "شكل مستقبل منصة إزرا",
      description: "لحاملي رموز إزرا تأثير مباشر على قرارات المنصة من خلال الحوكمة اللامركزية.",
      votingMechanics: [
        {
          icon: "Vote",
          title: "حقوق التصويت",
          description: "1 رمز إزرا = 1 صوت على جميع مقترحات الحوكمة"
        },
        {
          icon: "FileText",
          title: "تقديم المقترحات",
          description: "الحاملون الذين لديهم 10,000+ إزرا يمكنهم تقديم مقترحات الحوكمة"
        },
        {
          icon: "Users",
          title: "قرارات المجتمع",
          description: "التصويت على الموافقات على المشاريع وهياكل الرسوم وترقيات المنصة"
        }
      ],
      recentProposals: [
        {
          title: "تقليل رسوم السوق من 2٪ إلى 1.8٪",
          status: "تمت الموافقة",
          votes: "2.5 مليون إزرا",
          result: "approved"
        },
        {
          title: "إضافة إمارات جديدة إلى مناطق زراعة الأشجار",
          status: "نشط",
          votes: "1.8 مليون إزرا",
          result: "voting"
        },
        {
          title: "زيادة تخصيص مجمع مكافآت الرهن",
          status: "قيد الانتظار",
          votes: "0.5 مليون إزرا",
          result: "pending"
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  const getStatusColor = (result) => {
    switch (result) {
      case 'approved': return 'text-green-500';
      case 'voting': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            {text?.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {text?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {text?.votingMechanics?.map((mechanic, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={mechanic?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {mechanic?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mechanic?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-card rounded-2xl border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {currentLanguage === 'en' ? 'Recent Governance Proposals' : 'مقترحات الحوكمة الأخيرة'}
          </h3>
          <div className="space-y-4">
            {text?.recentProposals?.map((proposal, index) => (
              <div
                key={index}
                className="p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">
                      {proposal?.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${getStatusColor(proposal?.result)}`}>
                        {proposal?.status}
                      </span>
                      <span className="text-muted-foreground">
                        {proposal?.votes}
                      </span>
                    </div>
                  </div>
                  <Icon 
                    name={proposal?.result === 'approved' ? 'CheckCircle' : proposal?.result === 'voting' ? 'Clock' : 'AlertCircle'} 
                    size={24} 
                    className={getStatusColor(proposal?.result)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;