/**
 * Initial JSON Dashboard Configuration
 * Cloud Security Dashboard categories and widgets
 */

export const initialDashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      shortName: 'CSPM',
      description: 'Cloud Security Posture Management metrics and account risk evaluations',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2), Not Connected (2)',
          type: 'donut',
          data: {
            total: 4,
            totalLabel: 'Total Accounts',
            segments: [
              { label: 'Connected', value: 2, color: '#3b82f6' },
              { label: 'Not Connected', value: 2, color: '#93c5fd' },
            ],
          },
          createdAt: '2026-03-01T10:00:00Z',
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Risk Assessment',
          text: 'Passed (7253), Failed (1681), Warning (681), Not available (36)',
          type: 'donut',
          data: {
            total: 9651,
            totalLabel: 'Total Controls',
            segments: [
              { label: 'Passed', value: 7253, color: '#10b981' },
              { label: 'Failed', value: 1681, color: '#ef4444' },
              { label: 'Warning', value: 681, color: '#f59e0b' },
              { label: 'Not available', value: 36, color: '#cbd5e1' },
            ],
          },
          createdAt: '2026-03-01T10:05:00Z',
        },
      ],
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      shortName: 'CWPP',
      description: 'Cloud Workload Protection Platform alerts and runtime anomalies',
      widgets: [
        {
          id: 'top-5-namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'empty-chart',
          data: {
            message: 'No Graph data available!',
            description: 'No namespace alerts triggered in the last 24 hours.',
          },
          createdAt: '2026-03-01T10:10:00Z',
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'empty-chart',
          data: {
            message: 'No Graph data available!',
            description: 'All runtime workloads are currently operating normally.',
          },
          createdAt: '2026-03-01T10:15:00Z',
        },
      ],
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      shortName: 'Registry',
      description: 'Container registry vulnerability assessments and CVE posture',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities (Critical: 9, High: 150, Medium: 510, Low: 801)',
          type: 'progress',
          data: {
            total: 1470,
            totalLabel: 'Total Vulnerabilities',
            segments: [
              { label: 'Critical', value: 9, color: '#dc2626' },
              { label: 'High', value: 150, color: '#ea580c' },
              { label: 'Medium', value: 510, color: '#eab308' },
              { label: 'Low', value: 801, color: '#94a3b8' },
            ],
          },
          createdAt: '2026-03-01T10:20:00Z',
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images (Critical: 2, High: 2)',
          type: 'progress',
          data: {
            total: 2,
            totalLabel: 'Total Images Scanned',
            segments: [
              { label: 'Critical', value: 2, color: '#dc2626' },
              { label: 'High', value: 2, color: '#ea580c' },
            ],
          },
          createdAt: '2026-03-01T10:25:00Z',
        },
      ],
    },
  ],
};

/**
 * Predefined catalog of widgets per category for the Add Widget modal tabs.
 * Each tab displays all available widgets with checkboxes to select/deselect them.
 */
export const initialAvailableWidgets = {
  'cspm-executive': [
    {
      id: 'cloud-accounts',
      name: 'Cloud Accounts',
      text: 'Connected (2), Not Connected (2)',
      type: 'donut',
      data: {
        total: 4,
        totalLabel: 'Total Accounts',
        segments: [
          { label: 'Connected', value: 2, color: '#3b82f6' },
          { label: 'Not Connected', value: 2, color: '#93c5fd' },
        ],
      },
    },
    {
      id: 'cloud-risk-assessment',
      name: 'Cloud Risk Assessment',
      text: 'Passed (7253), Failed (1681), Warning (681), Not available (36)',
      type: 'donut',
      data: {
        total: 9651,
        totalLabel: 'Total Controls',
        segments: [
          { label: 'Passed', value: 7253, color: '#10b981' },
          { label: 'Failed', value: 1681, color: '#ef4444' },
          { label: 'Warning', value: 681, color: '#f59e0b' },
          { label: 'Not available', value: 36, color: '#cbd5e1' },
        ],
      },
    },
    {
      id: 'iam-security-posture',
      name: 'IAM Security Posture',
      text: 'MFA Enabled (94%), Inactive Users (3), Admin Roles (12)',
      type: 'progress',
      data: {
        total: 109,
        totalLabel: 'Total IAM Entities',
        segments: [
          { label: 'Compliant', value: 94, color: '#10b981' },
          { label: 'Admin Roles', value: 12, color: '#f59e0b' },
          { label: 'Inactive', value: 3, color: '#ef4444' },
        ],
      },
    },
    {
      id: 'cis-benchmarks',
      name: 'CIS Benchmark Compliance',
      text: 'Level 1: 92% passed, Level 2: 78% passed across AWS & Azure',
      type: 'custom',
      data: {
        highlights: [
          { label: 'AWS Foundations', status: '96% Passing' },
          { label: 'Azure Security Benchmark', status: '88% Passing' },
        ],
      },
    },
  ],
  'cwpp-dashboard': [
    {
      id: 'top-5-namespace-alerts',
      name: 'Top 5 Namespace Specific Alerts',
      text: 'No Graph data available!',
      type: 'empty-chart',
      data: {
        message: 'No Graph data available!',
        description: 'No namespace alerts triggered in the last 24 hours.',
      },
    },
    {
      id: 'workload-alerts',
      name: 'Workload Alerts',
      text: 'No Graph data available!',
      type: 'empty-chart',
      data: {
        message: 'No Graph data available!',
        description: 'All runtime workloads are currently operating normally.',
      },
    },
    {
      id: 'container-runtime-security',
      name: 'Container Runtime Security',
      text: 'Monitored Containers: 128, Blocked Executions: 0',
      type: 'donut',
      data: {
        total: 128,
        totalLabel: 'Containers',
        segments: [
          { label: 'Clean Runtime', value: 128, color: '#10b981' },
          { label: 'Quarantined', value: 0, color: '#ef4444' },
        ],
      },
    },
    {
      id: 'k8s-network-policy-drift',
      name: 'Kubernetes Network Policy Drift',
      text: 'Pods with strict egress: 95%, Default permit: 5%',
      type: 'progress',
      data: {
        total: 100,
        totalLabel: 'Policies Enforced',
        segments: [
          { label: 'Enforced', value: 95, color: '#10b981' },
          { label: 'Drift Detected', value: 5, color: '#f59e0b' },
        ],
      },
    },
  ],
  'registry-scan': [
    {
      id: 'image-risk-assessment',
      name: 'Image Risk Assessment',
      text: '1470 Total Vulnerabilities (Critical: 9, High: 150, Medium: 510, Low: 801)',
      type: 'progress',
      data: {
        total: 1470,
        totalLabel: 'Total Vulnerabilities',
        segments: [
          { label: 'Critical', value: 9, color: '#dc2626' },
          { label: 'High', value: 150, color: '#ea580c' },
          { label: 'Medium', value: 510, color: '#eab308' },
          { label: 'Low', value: 801, color: '#94a3b8' },
        ],
      },
    },
    {
      id: 'image-security-issues',
      name: 'Image Security Issues',
      text: '2 Total Images (Critical: 2, High: 2)',
      type: 'progress',
      data: {
        total: 2,
        totalLabel: 'Total Images Scanned',
        segments: [
          { label: 'Critical', value: 2, color: '#dc2626' },
          { label: 'High', value: 2, color: '#ea580c' },
        ],
      },
    },
    {
      id: 'base-image-freshness',
      name: 'Base Image Freshness',
      text: 'Up to Date: 42 images, Outdated: 6 images (Patches ready)',
      type: 'donut',
      data: {
        total: 48,
        totalLabel: 'Base Images',
        segments: [
          { label: 'Up to date', value: 42, color: '#10b981' },
          { label: 'Updates Pending', value: 6, color: '#f59e0b' },
        ],
      },
    },
    {
      id: 'cve-fixability-rate',
      name: 'CVE Fixability Rate',
      text: 'Vendor fix available for 82% of identified CVEs',
      type: 'progress',
      data: {
        total: 100,
        totalLabel: 'Fix Availability %',
        segments: [
          { label: 'Fix Available', value: 82, color: '#3b82f6' },
          { label: 'No Fix Yet', value: 18, color: '#cbd5e1' },
        ],
      },
    },
  ],
};
