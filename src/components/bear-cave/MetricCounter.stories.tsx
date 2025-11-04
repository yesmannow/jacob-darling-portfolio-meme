import type { Meta, StoryObj } from '@storybook/react';
import MetricCounter from './MetricCounter';

const meta: Meta<typeof MetricCounter> = {
  title: 'Bear Cave/Metric Counter',
  component: MetricCounter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An animated metrics display component showing key performance indicators with customizable themes and layouts.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select', options: ['grid', 'inline'] },
      description: 'Layout variant for metrics display'
    },
    maxItems: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Maximum number of metrics to display'
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the counter values'
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
    layout: 'grid',
    animated: true
  }
};

export const InlineLayout: Story = {
  args: {
    layout: 'inline',
    animated: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics displayed in a horizontal inline layout'
      }
    }
  }
};

export const LimitedItems: Story = {
  args: {
    layout: 'grid',
    maxItems: 3,
    animated: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Display only the first 3 metrics'
      }
    }
  }
};

export const NonAnimated: Story = {
  args: {
    layout: 'grid',
    animated: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Static display without animations'
      }
    }
  }
};