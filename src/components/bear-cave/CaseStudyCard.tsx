import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, DollarSign, Clock, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../../data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
  featured?: boolean;
  layout?: 'grid' | 'list';
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  className = '',
  featured = false,
  layout = 'grid'
}) => {
  // Extract primary metric for display
  const primaryMetric = caseStudy.metrics[0];
  const secondaryMetrics = caseStudy.metrics.slice(1, 3);

  // Get industry icon
  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'healthcare':
      case 'medical':
        return '🏥';
      case 'technology':
      case 'software':
      case 'b2b software':
        return '💻';
      case 'legal':
      case 'legal services':
        return '⚖️';
      case 'retail':
      case 'hospitality':
        return '🏪';
      case 'manufacturing':
        return '🏭';
      default:
        return '📈';
    }
  };

  const industryIcon = caseStudy.companyProfile?.industry ?
    getIndustryIcon(caseStudy.companyProfile.industry) : '📈';

  const cardClasses = `
    bear-cave-bullet group cursor-pointer transition-all duration-500 hover:scale-105
    ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
    ${className}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cardClasses}
      whileHover={{ y: -8 }}
    >
      <Link to={`/case-studies/${caseStudy.slug}`} className="block">
        {/* Card Header */}
        <div className="p-8">
          {/* Industry Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl">{industryIcon}</div>
            <div>
              <span className="inline-block px-3 py-1 bg-bear-cave-accent-gold/20 text-bear-cave-accent-gold text-sm font-semibold rounded-full border border-bear-cave-accent-gold/30">
                {caseStudy.companyProfile?.industry || caseStudy.category[0]}
              </span>
              {caseStudy.companyProfile?.companySize && (
                <span className="ml-2 text-bear-cave-light/60 text-sm">
                  {caseStudy.companyProfile.companySize}
                </span>
              )}
            </div>
          </div>

          {/* Title and Tagline */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-bear-cave-light mb-3 group-hover:text-bear-cave-accent-gold transition-colors">
              {caseStudy.title}
            </h3>
            <p className="text-bear-cave-light/70 leading-relaxed">
              {caseStudy.tagline}
            </p>
          </div>

          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Primary Metric */}
            <div className="bear-cave-metric p-4 rounded-xl text-center">
              <div className="text-2xl md:text-3xl font-extrabold bear-cave-metric-number mb-1">
                {primaryMetric.value}
              </div>
              <div className="text-bear-cave-light/70 text-sm">
                {primaryMetric.label}
              </div>
            </div>

            {/* Secondary Metrics */}
            {secondaryMetrics.map((metric, index) => (
              <div key={index} className="bear-cave-stone-bg p-4 rounded-xl text-center">
                <div className="text-xl font-bold text-bear-cave-light mb-1">
                  {metric.value}
                </div>
                <div className="text-bear-cave-light/60 text-xs">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* ROI Impact Preview */}
          {caseStudy.roiImpact && (
            <div className="mb-6">
              <div className="bear-cave-stone-bg p-4 rounded-xl">
                <h4 className="text-sm font-semibold text-bear-cave-accent-gold mb-3 uppercase tracking-wide">
                  Business Impact
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-bear-cave-light/80">{caseStudy.roiImpact.costSavings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-bear-cave-light/80">{caseStudy.roiImpact.revenueImpact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-bear-cave-light/80">{caseStudy.roiImpact.timeSavings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-bear-cave-light/80">{caseStudy.metrics[0].label}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Challenge Preview */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-bear-cave-light mb-2 uppercase tracking-wide">
              Challenge
            </h4>
            <p className="text-bear-cave-light/70 text-sm leading-relaxed line-clamp-3">
              {caseStudy.challenge}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-bear-cave-accent-gold font-semibold group-hover:text-bear-cave-light transition-colors">
              <span>See Business Impact</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {featured && (
              <span className="text-xs bg-bear-cave-accent-gold/20 text-bear-cave-accent-gold px-2 py-1 rounded-full border border-bear-cave-accent-gold/30">
                FEATURED
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-bear-cave-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  className?: string;
  layout?: 'grid' | 'list';
  maxItems?: number;
  featuredFirst?: boolean;
}

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({
  caseStudies,
  className = '',
  layout = 'grid',
  maxItems,
  featuredFirst = true
}) => {
  const displayStudies = maxItems ? caseStudies.slice(0, maxItems) : caseStudies;

  // Sort featured studies first if requested
  const sortedStudies = featuredFirst
    ? [...displayStudies].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      })
    : displayStudies;

  const gridClasses = layout === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    : 'space-y-6';

  return (
    <section className={`py-20 ${className}`}>
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
            <span className="bear-cave-text-gradient"> BUSINESS RESULTS</span>
          </h2>
          <p className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed">
            Real case studies from CMOs who've emerged from marketing complexity into structured growth
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className={gridClasses}>
          {sortedStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CaseStudyCard
                caseStudy={caseStudy}
                featured={caseStudy.featured}
                layout={layout}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {!maxItems || displayStudies.length < caseStudies.length ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bear-cave-stone-bg p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-bear-cave-light mb-4">
                Ready to write your success story?
              </h3>
              <p className="text-bear-cave-light/70 mb-6">
                Every case study started with a CMO facing complex marketing challenges.
                Let's discuss how we can emerge your organization from complexity into growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bear-cave-btn-primary px-8 py-4 rounded-xl text-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SCHEDULE STRATEGY CALL
                </motion.button>
                <motion.button
                  className="bear-cave-btn-secondary px-8 py-4 rounded-xl text-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW ALL CASE STUDIES
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default CaseStudyCard;
export { CaseStudyGrid };