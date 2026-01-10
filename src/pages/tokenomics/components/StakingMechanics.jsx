import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const StakingMechanics = ({ currentLanguage }) => {
  const [stakingAmount, setStakingAmount] = useState(10000);
  const [lockPeriod, setLockPeriod] = useState(12);

  const calculateRewards = () => {
    const baseAPY = lockPeriod === 3 ? 8 : lockPeriod === 6 ? 10 : lockPeriod === 12 ? 12 : 15;
    const annualReward = stakingAmount * (baseAPY / 100);
    const monthlyReward = annualReward / 12;
    return { apy: baseAPY, annual: annualReward, monthly: monthlyReward };
  };

  const rewards = calculateRewards();

  const content = {
    en: {
      title: "Staking Mechanics",
      subtitle: "Earn Passive Income by Staking IZRA",
      calculatorTitle: "Staking Calculator",
      stakingAmountLabel: "Staking Amount (IZRA)",
      lockPeriodLabel: "Lock Period",
      periods: [
        { value: 3, label: "3 Months", apy: "8%" },
        { value: 6, label: "6 Months", apy: "10%" },
        { value: 12, label: "12 Months", apy: "12%" },
        { value: 24, label: "24 Months", apy: "15%" }
      ],
      projectedRewards: "Projected Rewards",
      apyLabel: "APY",
      annualLabel: "Annual Reward",
      monthlyLabel: "Monthly Reward",
      features: [
        {
          icon: "Shield",
          title: "Secure Staking",
          description: "Smart contract-based staking with audited security protocols"
        },
        {
          icon: "Zap",
          title: "Flexible Periods",
          description: "Choose from 3, 6, 12, or 24-month lock periods with varying APY"
        },
        {
          icon: "RefreshCw",
          title: "Auto-Compound",
          description: "Option to automatically reinvest rewards for compound growth"
        },
        {
          icon: "TrendingUp",
          title: "Revenue Share",
          description: "Staking rewards funded by platform transaction fees"
        }
      ]
    },
    ar: {
      title: "آليات الرهن",
      subtitle: "اكسب دخلاً سلبيًا عن طريق رهن إزرا",
      calculatorTitle: "حاسبة الرهن",
      stakingAmountLabel: "مبلغ الرهن (إزرا)",
      lockPeriodLabel: "فترة القفل",
      periods: [
        { value: 3, label: "3 أشهر", apy: "8٪" },
        { value: 6, label: "6 أشهر", apy: "10٪" },
        { value: 12, label: "12 شهرًا", apy: "12٪" },
        { value: 24, label: "24 شهرًا", apy: "15٪" }
      ],
      projectedRewards: "المكافآت المتوقعة",
      apyLabel: "APY",
      annualLabel: "المكافأة السنوية",
      monthlyLabel: "المكافأة الشهرية",
      features: [
        {
          icon: "Shield",
          title: "رهن آمن",
          description: "رهن قائم على العقود الذكية مع بروتوكولات أمان مدققة"
        },
        {
          icon: "Zap",
          title: "فترات مرنة",
          description: "اختر من فترات قفل 3 أو 6 أو 12 أو 24 شهرًا مع APY متفاوت"
        },
        {
          icon: "RefreshCw",
          title: "مركب تلقائي",
          description: "خيار لإعادة استثمار المكافآت تلقائيًا للنمو المركب"
        },
        {
          icon: "TrendingUp",
          title: "مشاركة الإيرادات",
          description: "مكافآت الرهن ممولة من رسوم معاملات المنصة"
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-background rounded-2xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {text?.calculatorTitle}
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {text?.stakingAmountLabel}
                </label>
                <input
                  type="number"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(Number(e?.target?.value))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="100"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  {text?.lockPeriodLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {text?.periods?.map((period) => (
                    <button
                      key={period?.value}
                      onClick={() => setLockPeriod(period?.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        lockPeriod === period?.value
                          ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/30'
                      }`}>
                      <div className="text-sm font-semibold">{period?.label}</div>
                      <div className="text-xs mt-1">{period?.apy} APY</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <h4 className="text-lg font-bold text-foreground">
                  {text?.projectedRewards}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm text-muted-foreground">{text?.apyLabel}</span>
                    <span className="text-xl font-bold text-primary">{rewards?.apy}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <span className="text-sm text-muted-foreground">{text?.annualLabel}</span>
                    <span className="text-lg font-bold text-foreground">{rewards?.annual?.toLocaleString()} IZRA</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <span className="text-sm text-muted-foreground">{text?.monthlyLabel}</span>
                    <span className="text-lg font-bold text-foreground">{rewards?.monthly?.toLocaleString()} IZRA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {text?.features?.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StakingMechanics;