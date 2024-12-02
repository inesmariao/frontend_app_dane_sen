import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import SurveyForm from '@/components/app_diversa/SurveyForm';

test('SurveyForm accessibility check', async () => {
  const { container } = render(<SurveyForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
