import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Target, Users, Shield } from 'lucide-react';

interface ValueBullet {
  id: string;
  title: string;
  metric: string;
  description: string;
  icon: React.ReactNode;
  impact: 'positive' | 'efficiency' | 'time';
}

const valueBullets: ValueBullet[] = [
  {
    id: 'leads-increase',
    title: 'Lead Generation',
    metric: '25-40%',
    description: 'Increase in qualified leads through automated nurture campaigns and optimized conversion funnels',
    icon: <TrendingUp className="w-6 h-6" />,
    impact: 'positive'
  },
  {
    id: 'cost-reduction',
    title: 'Cost Efficiency',
    metric: '50-70%',
    description: 'Reduction in manual marketing operations and customer acquisition costs through smart automation',
    icon: <DollarSign className="w-6 h-6" />,
    impact: 'efficiency'
  },
  {
    id: 'time-savings',
    title: 'Time to Value',
    metric: '2-3x',
    description: 'Faster campaign deployment and execution with streamlined workflows and automated processes',
    icon: <Clock className="w-6 h-6" />,
    impact: 'time'
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Lift',
    metric: '30-50%',
    description: 'Higher conversion rates from lead to customer through personalized, data-driven experiences',
    icon: <Target className="w-6 h-6" />,
    impact: 'positive'
  },
  {
    id: 'team-productivity',
    title: 'Team Productivity',
    metric: '60-80%',
    description: 'Increase in marketing team capacity through automation of repetitive tasks and processes',
    icon: <Users className="w-6 h-6" />,
    impact: 'efficiency'
  },
  {
    id: 'roi-protection',
    title: 'ROI Protection',
    metric: '95%+',
    description: 'Campaign success rate with built-in monitoring, optimization, and risk mitigation strategies',
    icon: <Shield className="w-6 h-6" />,
    impact: 'positive'
  }
];

interface ValueBulletsProps {
  className?: string;
  layout?: 'grid' | 'stacked';
  maxItems?: number;
}

const ValueBullets: React.FC<ValueBulletsProps> = ({
  className = '',
  layout = 'grid',
  maxItems
}) => {
  const displayBullets = maxItems ? valueBullets.slice(0, maxItems) : valueBullets;

  const gridClasses = layout === 'grid'
    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-4';

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'efficiency':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'time':
        return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      default:
        return 'from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/30 border-bear-cave-accent-gold/30';
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-bear-cave-primary-dark/95 to-bear-cave-slate/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-bear-cave-light mb-6 tracking-tight">
            PROVEN
            <span className="bear-cave-text-gradient"> BUSINESS IMPACT</span>
          </h2>
          <p className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed">
            Marketing automation delivers measurable results for CMOs who demand data-driven growth strategies
          </p>
        </motion.div>

        {/* Value Bullets Grid */}
        <div className={gridClasses}>
          {displayBullets.map((bullet, index) => (
            <motion.div
              key={bullet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bear-cave-bullet p-8 rounded-2xl group hover:scale-105 transition-all duration-300"
            >
              {/* Icon and Metric Row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-bear-cave-accent-gold/20 rounded-xl flex items-center justify-center group-hover:bg-bear-cave-accent-gold/30 transition-colors">
                  <div className="text-bear-cave-accent-gold">
                    {bullet.icon}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-extrabold bear-cave-metric-number">
                    {bullet.metric}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-bear-cave-light mb-3 group-hover:text-bear-cave-accent-gold transition-colors">
                  {bullet.title}
                </h3>
                <p className="text-bear-cave-light/70 leading-relaxed">
                  {bullet.description}
                </p>
              </div>

              {/* Impact Badge */}
              <div className={`mt-6 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getImpactColor(bullet.impact)} border`}>
                <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-60"></span>
                {bullet.impact.toUpperCase()} IMPACT
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bear-cave-stone-bg p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-bear-cave-light mb-4">
              Ready to achieve similar results for your organization?
            </h3>
            <p className="text-bear-cave-light/70 mb-6">
              Let's discuss your specific marketing challenges and create a custom automation strategy that delivers measurable ROI.
            </p>
            <motion.button
              className="bear-cave-btn-primary px-8 py-4 rounded-xl text-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET CUSTOM ROI ANALYSIS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueBullets;