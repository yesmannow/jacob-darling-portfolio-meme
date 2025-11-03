import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Clock, Target, Zap } from 'lucide-react';

interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: 'gold' | 'green' | 'blue' | 'purple';
}

const metrics: Metric[] = [
  {
    id: 'leads-increase',
    value: 40,
    suffix: '%',
    label: 'Lead Increase',
    description: 'Average conversion lift through automation',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'green'
  },
  {
    id: 'cost-reduction',
    value: 70,
    suffix: '%',
    label: 'Cost Reduction',
    description: 'Manual operations eliminated',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'blue'
  },
  {
    id: 'users-served',
    value: 30000,
    suffix: '+',
    label: 'Users Served',
    description: 'Across all marketing platforms',
    icon: <Users className="w-6 h-6" />,
    color: 'gold'
  },
  {
    id: 'time-to-value',
    value: 6,
    suffix: ' Months',
    label: 'Time to ROI',
    description: 'Average payback period',
    icon: <Clock className="w-6 h-6" />,
    color: 'purple'
  },
  {
    id: 'automations',
    value: 400,
    suffix: '+',
    label: 'Automations',
    description: 'Successfully deployed workflows',
    icon: <Zap className="w-6 h-6" />,
    color: 'gold'
  },
  {
    id: 'conversion-lift',
    value: 50,
    suffix: '%',
    label: 'Conversion Lift',
    description: 'Lead to customer conversion improvement',
    icon: <Target className="w-6 h-6" />,
    color: 'green'
  }
];

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = '',
  prefix = ''
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

interface MetricCounterProps {
  className?: string;
  layout?: 'grid' | 'inline';
  maxItems?: number;
  animated?: boolean;
}

const MetricCounter = ({
  className = '',
  layout = 'grid',
  maxItems,
  animated = true
}: MetricCounterProps) => {
  const displayMetrics = maxItems ? metrics.slice(0, maxItems) : metrics;

  const gridClasses = layout === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'flex flex-wrap justify-center gap-8';

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gold':
        return {
          bg: 'from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/30',
          border: 'border-bear-cave-accent-gold/30',
          icon: 'text-bear-cave-accent-gold',
          number: 'text-bear-cave-accent-gold',
          glow: 'shadow-bear'
        };
      case 'green':
        return {
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          icon: 'text-green-400',
          number: 'text-green-400',
          glow: 'shadow-green-500/25'
        };
      case 'blue':
        return {
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          icon: 'text-blue-400',
          number: 'text-blue-400',
          glow: 'shadow-blue-500/25'
        };
      case 'purple':
        return {
          bg: 'from-purple-500/20 to-purple-600/20',
          border: 'border-purple-500/30',
          icon: 'text-purple-400',
          number: 'text-purple-400',
          glow: 'shadow-purple-500/25'
        };
      default:
        return {
          bg: 'from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/30',
          border: 'border-bear-cave-accent-gold/30',
          icon: 'text-bear-cave-accent-gold',
          number: 'text-bear-cave-accent-gold',
          glow: 'shadow-bear'
        };
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-bear-cave-slate/10 to-bear-cave-primary-dark/95 ${className}`}>
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
            <span className="bear-cave-text-gradient"> PERFORMANCE</span>
          </h2>
          <p className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed">
            Real metrics from real implementations. See the measurable impact of strategic marketing automation.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className={gridClasses}>
          {displayMetrics.map((metric, index) => {
            const colors = getColorClasses(metric.color);

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className={`bear-cave-metric p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.glow}`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${colors.bg.replace('/20', '/30').replace('/30', '/40')} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <div className={colors.icon}>
                    {metric.icon}
                  </div>
                </div>

                {/* Metric Number */}
                <div className={`text-4xl md:text-5xl font-extrabold ${colors.number} mb-3 font-mono tracking-tight`}>
                  {animated ? (
                    <AnimatedCounter
                      end={metric.value}
                      suffix={metric.suffix}
                      duration={2 + index * 0.2}
                    />
                  ) : (
                    `${metric.value}${metric.suffix}`
                  )}
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-bear-cave-light mb-3 group-hover:text-bear-cave-accent-gold transition-colors">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-bear-cave-light/70 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bear-cave-stone-bg p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-bear-cave-light mb-4">
              These aren't just numbers—they're your competitive advantage
            </h3>
            <p className="text-bear-cave-light/70 mb-6 leading-relaxed">
              Every metric represents real businesses that emerged from marketing complexity into structured growth.
              Your organization could be next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bear-cave-btn-primary px-8 py-4 rounded-xl text-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DISCUSS YOUR METRICS
              </motion.button>
              <motion.button
                className="bear-cave-btn-secondary px-8 py-4 rounded-xl text-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW DETAILED CASE STUDIES
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricCounter;
