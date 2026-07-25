/**
 * Mock server / data for CodeValid UI tests.
 *
 * Place mock API responses, fixtures, and MSW (or similar) handlers here.
 * Test scripts import from this directory; mock payloads must NOT be embedded
 * directly in test files.
 *
 * Example usage in a test:
 *
 *   import { mockDashboardData } from "../../mock/dashboard.js";
 *
 * This file is intentionally minimal for the seed test; extend as needed for
 * task-specific test suites.
 */

export const mockDashboardData = {
  title: "Nuxt Dashboard Template",
  stats: {
    users: 1234,
    revenue: 56789,
    orders: 42,
  },
};
