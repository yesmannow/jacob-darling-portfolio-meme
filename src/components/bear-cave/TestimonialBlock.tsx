import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Building, TrendingUp } from 'lucide-react';
import { Testimonial } from '../../data/testimonials';

interface TestimonialBlockProps {
  testimonials: Testimonial[];
  className?: string;
  layout?: 'grid' | 'carousel' | 'single';
  maxItems?: number;
}

const TestimonialBlock = ({
  testimonials,
  className = '',
  layout = 'grid',
  maxItems
}: TestimonialBlockProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayTestimonials = maxItems ? testimonials.slice(0, maxItems) : testimonials;

  // Filter for featured testimonials first, then take requested amount
  const featuredTestimonials = displayTestimonials.filter(t => t.featured);
  const finalTestimonials = featuredTestimonials.length > 0
    ? featuredTestimonials.slice(0, maxItems || 3)
    : displayTestimonials.slice(0, maxItems || 3);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % finalTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + finalTestimonials.length) % finalTestimonials.length);
  };

  // Get company icon based on industry/company type
  const getCompanyIcon = (company?: string) => {
    if (!company) return '🏢';

    const companyLower = company.toLowerCase();
    if (companyLower.includes('health') || companyLower.includes('medical')) return '🏥';
    if (companyLower.includes('tech') || companyLower.includes('software')) return '💻';
    if (companyLower.includes('legal') || companyLower.includes('law')) return '⚖️';
    if (companyLower.includes('finance') || companyLower.includes('bank')) return '🏦';
    if (companyLower.includes('retail') || companyLower.includes('shop')) return '🏪';
    return '🏢';
  };

  // Render single testimonial card
  const renderTestimonialCard = (testimonial: Testimonial, index: number, featured = false) => (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bear-cave-testimonial p-8 rounded-2xl relative ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      whileHover={{ y: -4 }}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-bear-cave-accent-gold/10 rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-bear-cave-accent-gold" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-bear-cave-accent-gold text-bear-cave-accent-gold" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-bear-cave-light/90 text-lg leading-relaxed mb-8 italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-gradient-to-br from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/40 rounded-full flex items-center justify-center">
          <span className="text-bear-cave-accent-gold font-bold text-lg">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        <div className="flex-1">
          <div className="font-bold text-bear-cave-light text-lg">
            {testimonial.name}
          </div>
          <div className="text-bear-cave-accent-gold font-semibold">
            {testimonial.role}
          </div>
          {testimonial.company && (
            <div className="flex items-center gap-2 text-bear-cave-light/70 mt-1">
              <span className="text-lg">{getCompanyIcon(testimonial.company)}</span>
              <span className="font-medium">{testimonial.company}</span>
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="bg-bear-cave-accent-gold/20 text-bear-cave-accent-gold px-3 py-1 rounded-full text-xs font-semibold border border-bear-cave-accent-gold/30">
            FEATURED
          </div>
        )}
      </div>

      {/* Business Impact Indicator */}
      {testimonial.relationship && (
        <div className="mt-6 pt-6 border-t border-bear-cave-accent-gold/20">
          <div className="flex items-center gap-2 text-sm text-bear-cave-light/60">
            <TrendingUp className="w-4 h-4" />
            <span>{testimonial.relationship}</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  // Grid Layout
  if (layout === 'grid') {
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
              CMO
              <span className="bear-cave-text-gradient"> TESTIMONIALS</span>
            </h2>
            <p className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed">
              Marketing leaders who've emerged from complexity into structured growth through strategic automation
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalTestimonials.map((testimonial, index) =>
              renderTestimonialCard(testimonial, index, index === 0)
            )}
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
                Join the CMOs who've transformed their marketing operations
              </h3>
              <p className="text-bear-cave-light/70 mb-6">
                Ready to emerge from marketing complexity into measurable growth?
                Let's discuss your automation strategy.
              </p>
              <motion.button
                className="bear-cave-btn-primary px-8 py-4 rounded-xl text-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SCHEDULE STRATEGY CONSULTATION
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Carousel Layout
  if (layout === 'carousel') {
    return (
      <section className={`py-20 bg-gradient-to-br from-bear-cave-primary-dark/95 to-bear-cave-slate/10 ${className}`}>
        <div className="max-w-4xl mx-auto px-6">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-bear-cave-light mb-6 tracking-tight">
              WHAT CMOs ARE SAYING
            </h2>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {renderTestimonialCard(finalTestimonials[currentIndex], 0, true)}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bear-cave-accent-gold/20 hover:bg-bear-cave-accent-gold/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-bear-cave-accent-gold" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bear-cave-accent-gold/20 hover:bg-bear-cave-accent-gold/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-bear-cave-accent-gold" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {finalTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-bear-cave-accent-gold'
                    : 'bg-bear-cave-light/30 hover:bg-bear-cave-light/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Single Layout
  return (
    <section className={`py-20 bg-gradient-to-br from-bear-cave-primary-dark/95 to-bear-cave-slate/10 ${className}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        {finalTestimonials[0] && renderTestimonialCard(finalTestimonials[0], 0, true)}
      </div>
    </section>
  );
};

export default TestimonialBlock;
