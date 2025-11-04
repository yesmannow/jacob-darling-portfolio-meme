// Temporary ambient module for 'storybook/test' imports used in stories/tests.
// Replace usages with the canonical testing package (e.g. '@storybook/testing-library')
// and remove this file once proper package typings are installed.
declare module 'storybook/test' {
  export const expect: any;
  export const userEvent: any;
  export const within: any;
  export const waitFor: any;
  export default any;
}
