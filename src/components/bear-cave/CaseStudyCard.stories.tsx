import type { Meta, StoryObj } from '@storybook/react';
import CaseStudyCard from './CaseStudyCard';
import { caseStudies } from '../../data/caseStudies';

const meta: Meta<typeof CaseStudyCard> = {
  title: 'Bear Cave/Case Study Card',
  component: CaseStudyCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component for displaying case study information with metrics, industry badges, and interactive hover effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    featured: {
      control: 'boolean',
      description: 'Whether this is a featured case study'
    },
    layout: {
      control: { type: 'select', options: ['grid', 'list'] },
      description: 'Layout variant for the card'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    caseStudy: caseStudies[0],
    featured: false,
    layout: 'grid'
  }
};

export const Featured: Story = {
  args: {
    caseStudy: caseStudies.find(cs => cs.featured) || caseStudies[0],
    featured: true,
    layout: 'grid'
  }
};

export const ListLayout: Story = {
  args: {
    caseStudy: caseStudies[0],
    featured: false,
    layout: 'list'
  },
  parameters: {
    docs: {
      description: {
        story: 'Case study card in list layout variant'
      }
    }
  }
};

export const HealthcareIndustry: Story = {
  args: {
    caseStudy: caseStudies.find(cs => cs.companyProfile?.industry?.toLowerCase().includes('healthcare')) || caseStudies[0],
    featured: false,
    layout: 'grid'
  }
};

export const LegalIndustry: Story = {
  args: {
    caseStudy: caseStudies.find(cs => cs.companyProfile?.industry?.toLowerCase().includes('legal')) || caseStudies[0],
    featured: false,
    layout: 'grid'
  }
};