import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

interface ROIInputs {
  monthlyRevenue: number;
  marketingSpend: number;
  currentConversionRate: number;
  teamSize: number;
  automationGoals: string[];
}

interface ROIResults {
  potentialRevenueIncrease: number;
  costSavings: number;
  timeToValue: number;
  roiPercentage: number;
  paybackPeriod: number;
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    monthlyRevenue: 50000,
    marketingSpend: 10000,
    currentConversionRate: 2.5,
    teamSize: 5,
    automationGoals: ['lead_generation']
  });

  const [results, setResults] = useState<ROIResults>({
    potentialRevenueIncrease: 0,
    costSavings: 0,
    timeToValue: 0,
    roiPercentage: 0,
    paybackPeriod: 0
  });

  const automationGoals = [
    { id: 'lead_generation', label: 'Lead Generation Automation', impact: 40 },
    { id: 'customer_support', label: 'Customer Support Automation', impact: 70 },
    { id: 'email_marketing', label: 'Email Marketing Automation', impact: 30 },
    { id: 'social_media', label: 'Social Media Automation', impact: 25 },
    { id: 'analytics', label: 'Marketing Analytics & Reporting', impact: 35 },
    { id: 'campaign_management', label: 'Campaign Management', impact: 45 }
  ];

  const calculateROI = () => {
    const selectedGoals = automationGoals.filter(goal =>
      inputs.automationGoals.includes(goal.id)
    );

    const avgImpact = selectedGoals.reduce((sum, goal) => sum + goal.impact, 0) / selectedGoals.length;

    // Revenue increase calculation
    const revenueIncrease = (inputs.monthlyRevenue * (avgImpact / 100));

    // Cost savings calculation (based on team efficiency gains)
    const laborCost = inputs.teamSize * 5000; // $5k/month per team member
    const efficiencyGain = Math.min(avgImpact, 70) / 100; // Cap at 70%
    const costSavings = laborCost * efficiencyGain;

    // Time to value (faster with more goals selected)
    const timeToValue = Math.max(2, 6 - (selectedGoals.length * 0.5));

    // ROI calculation
    const monthlyBenefit = revenueIncrease + costSavings;
    const investment = 15000; // Estimated implementation cost
    const roiPercentage = ((monthlyBenefit * 12 - investment) / investment) * 100;
    const paybackPeriod = investment / monthlyBenefit;

    setResults({
      potentialRevenueIncrease: revenueIncrease,
      costSavings: costSavings,
      timeToValue: timeToValue,
      roiPercentage: Math.max(0, roiPercentage),
      paybackPeriod: paybackPeriod
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleGoalToggle = (goalId: string) => {
    setInputs(prev => ({
      ...prev,
      automationGoals: prev.automationGoals.includes(goalId)
        ? prev.automationGoals.filter(id => id !== goalId)
        : [...prev.automationGoals, goalId]
    }));
  };

  const handleInputChange = (field: keyof ROIInputs, value: number | string[]) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="roi-calculator py-20 bg-gradient-to-br from-bear-cave-primary-dark/95 to-bear-cave-slate/20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-bear-cave-light mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              CALCULATE YOUR
              <span className="bear-cave-text-gradient"> MARKETING ROI</span>
            </motion.h2>
            <motion.p
              className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Emerge from marketing complexity into data-driven growth. Calculate the potential ROI
              from strategic marketing automation based on your current operations.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bear-cave-metric p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-bear-cave-light mb-6 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-bear-cave-accent-gold" />
                  Your Current Situation
                </h3>

                {/* Monthly Revenue */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-bear-cave-light">
                    Monthly Revenue
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bear-cave-light/60" />
                    <input
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-bear-cave-primary-dark/50 border border-bear-cave-accent-gold/30 rounded-lg focus:ring-2 focus:ring-bear-cave-accent-gold focus:border-transparent text-bear-cave-light"
                      placeholder="50000"
                    />
                  </div>
                </div>

                {/* Marketing Spend */}
                <div className="space-y-2 mt-6">
                  <label className="block text-sm font-medium text-bear-cave-light">
                    Monthly Marketing Spend
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bear-cave-light/60" />
                    <input
                      type="number"
                      value={inputs.marketingSpend}
                      onChange={(e) => handleInputChange('marketingSpend', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-bear-cave-primary-dark/50 border border-bear-cave-accent-gold/30 rounded-lg focus:ring-2 focus:ring-bear-cave-accent-gold focus:border-transparent text-bear-cave-light"
                      placeholder="10000"
                    />
                  </div>
                </div>

                {/* Current Conversion Rate */}
                <div className="space-y-2 mt-6">
                  <label className="block text-sm font-medium text-bear-cave-light">
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.currentConversionRate}
                    onChange={(e) => handleInputChange('currentConversionRate', Number(e.target.value))}
                    className="w-full px-4 py-3 bg-bear-cave-primary-dark/50 border border-bear-cave-accent-gold/30 rounded-lg focus:ring-2 focus:ring-bear-cave-accent-gold focus:border-transparent text-bear-cave-light"
                    placeholder="2.5"
                  />
                </div>

                {/* Team Size */}
                <div className="space-y-2 mt-6">
                  <label className="block text-sm font-medium text-bear-cave-light">
                    Marketing Team Size
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bear-cave-light/60" />
                    <input
                      type="number"
                      value={inputs.teamSize}
                      onChange={(e) => handleInputChange('teamSize', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-bear-cave-primary-dark/50 border border-bear-cave-accent-gold/30 rounded-lg focus:ring-2 focus:ring-bear-cave-accent-gold focus:border-transparent text-bear-cave-light"
                      placeholder="5"
                    />
                  </div>
                </div>

                {/* Automation Goals */}
                <div className="space-y-3 mt-8">
                  <label className="block text-sm font-medium text-bear-cave-light">
                    Automation Goals (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {automationGoals.map((goal) => (
                      <label key={goal.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inputs.automationGoals.includes(goal.id)}
                          onChange={() => handleGoalToggle(goal.id)}
                          className="w-4 h-4 text-bear-cave-accent-gold bg-bear-cave-primary-dark/50 border-bear-cave-accent-gold/30 rounded focus:ring-bear-cave-accent-gold focus:ring-2"
                        />
                        <span className="text-sm text-bear-cave-light">{goal.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bear-cave-metric p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-bear-cave-light mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-bear-cave-accent-gold" />
                  Projected Results
                </h3>

                {/* Revenue Increase */}
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-6 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-bear-cave-light/70">Monthly Revenue Increase</p>
                      <p className="text-3xl font-bold text-green-400">
                        ${results.potentialRevenueIncrease.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-400" />
                  </div>
                </div>

                {/* Cost Savings */}
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-6 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-bear-cave-light/70">Monthly Cost Savings</p>
                      <p className="text-3xl font-bold text-blue-400">
                        ${results.costSavings.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-12 h-12 text-blue-400" />
                  </div>
                </div>

                {/* Time to Value */}
                <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-6 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-bear-cave-light/70">Time to See Results</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {results.timeToValue.toFixed(1)} months
                      </p>
                    </div>
                    <Clock className="w-12 h-12 text-purple-400" />
                  </div>
                </div>

                {/* ROI Summary */}
                <div className="bg-gradient-to-r from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/30 p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-bear-cave-light/70 mb-2">Annual ROI</p>
                    <p className="text-4xl font-bold bear-cave-text-gradient">
                      {results.roiPercentage.toFixed(0)}%
                    </p>
                    <p className="text-sm text-bear-cave-light/70 mt-2">
                      Payback period: {results.paybackPeriod.toFixed(1)} months
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <motion.button
                    className="w-full bear-cave-btn-primary py-4 px-6 rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    GET CUSTOM ROI ANALYSIS
                  </motion.button>
                  <p className="text-xs text-bear-cave-light/60 mt-3">
                    Schedule a 15-minute strategy call to discuss your specific automation needs
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bear-cave-stone-bg p-4 rounded-lg">
                <p className="text-xs text-bear-cave-light/60 text-center">
                  * Estimates based on industry averages and typical automation implementation results.
                  Actual results may vary based on specific business circumstances and market conditions.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ROICalculator;