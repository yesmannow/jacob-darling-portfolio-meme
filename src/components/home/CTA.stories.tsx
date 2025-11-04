import type { Meta, StoryObj } from '@storybook/react';
import CTA from './CTA';

const meta: Meta<typeof CTA> = {
  title: 'Home/CTA',
  component: CTA,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A call-to-action component with animated background, particle effects, and multiple contact options.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithCustomBackground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'CTA component with custom gradient background and particle animations'
      }
    }
  }
};