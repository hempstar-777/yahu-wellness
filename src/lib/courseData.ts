// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = "pk_live_51RguezKudeVpFdWFChv7wcwiQsEpk0LyzgHD1qsj3OeiCzF3vq6TagDy67LLezqbw02t1CvRYYdxwOfeWBpbvwEU00G09w4FG0";

// Course pricing structure
export const coursePricing = {
  deliverance: {
    fullCourse: 297,
    modules: [49, 69, 89, 99],
  },
  intercessors: {
    fullCourse: 247,
    modules: [49, 69, 89],
  },
  trauma: {
    fullCourse: 247,
    modules: [59, 79, 99],
  },
  naturalHealing: {
    fullCourse: 347,
    modules: [59, 79, 99, 129],
  },
  tribunals: {
    fullCourse: 247,
    modules: [59, 79, 99],
  },
};

export const calculateSavings = (courseId: keyof typeof coursePricing) => {
  const pricing = coursePricing[courseId];
  const moduleTotal = pricing.modules.reduce((sum, price) => sum + price, 0);
  const savings = moduleTotal - pricing.fullCourse;
  const savingsPercent = Math.round((savings / moduleTotal) * 100);
  return { savings, savingsPercent, moduleTotal };
};
