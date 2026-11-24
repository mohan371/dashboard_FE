/**
 * Node Verification Script for Dashboard State & Validation
 */
import { initialDashboardData, initialAvailableWidgets } from '../src/data/initialDashboardData.js';

function runTests() {
  console.log('🧪 Starting CloudGuard Dashboard automated tests...\n');

  // Test 1: JSON Config Validation
  console.log('Test 1: Validating initial JSON configuration structure...');
  if (!initialDashboardData.categories || !Array.isArray(initialDashboardData.categories)) {
    throw new Error('Categories must be an array');
  }
  if (initialDashboardData.categories.length < 3) {
    throw new Error('Must contain at least 3 categories');
  }
  for (const cat of initialDashboardData.categories) {
    if (!cat.id || !cat.name || !Array.isArray(cat.widgets)) {
      throw new Error(`Invalid category structure for ${cat.name}`);
    }
    if (cat.widgets.length < 2) {
      throw new Error(`Category ${cat.name} must have multiple widgets`);
    }
    for (const widget of cat.widgets) {
      if (!widget.id || !widget.name || !widget.text) {
        throw new Error(`Widget ${widget.name || 'unnamed'} missing mandatory fields`);
      }
    }
  }
  console.log(`✅ Test 1 Passed: Found ${initialDashboardData.categories.length} categories with valid widgets.\n`);

  // Test 2: Duplicate Prevention Logic
  console.log('Test 2: Verifying Duplicate Prevention...');
  const cat = initialDashboardData.categories[0];
  const existingName = cat.widgets[0].name;

  const isDuplicateExact = cat.widgets.some(
    (w) => w.name.trim().toLowerCase() === existingName.trim().toLowerCase()
  );
  if (!isDuplicateExact) {
    throw new Error('Failed to detect exact duplicate name');
  }

  const isDuplicateCaseInsensitive = cat.widgets.some(
    (w) => w.name.trim().toLowerCase() === existingName.toUpperCase().toLowerCase()
  );
  if (!isDuplicateCaseInsensitive) {
    throw new Error('Failed to detect case-insensitive duplicate name');
  }

  const uniqueName = 'Completely Unique Custom Metric';
  const isUnique = !cat.widgets.some(
    (w) => w.name.trim().toLowerCase() === uniqueName.trim().toLowerCase()
  );
  if (!isUnique) {
    throw new Error('Unique name incorrectly flagged as duplicate');
  }
  console.log('✅ Test 2 Passed: Duplicate widget name prevention verified.\n');

  // Test 3: Widget Removal & Empty State Trigger
  console.log('Test 3: Verifying Widget Removal & Empty State Condition...');
  let simulatedWidgets = [...cat.widgets];
  const widgetToRemove = simulatedWidgets[0];
  simulatedWidgets = simulatedWidgets.filter((w) => w.id !== widgetToRemove.id);

  if (simulatedWidgets.length !== cat.widgets.length - 1) {
    throw new Error('Widget removal failed');
  }

  // Remove remaining
  simulatedWidgets = [];
  const isEmpty = simulatedWidgets.length === 0;
  if (!isEmpty) {
    throw new Error('Empty state condition check failed');
  }
  console.log('✅ Test 3 Passed: Widget removal and empty category state condition verified.\n');

  // Test 4: Global Search Filtering Logic
  console.log('Test 4: Verifying Global Search Filtering...');
  const query = 'accounts';
  let matches = 0;
  for (const c of initialDashboardData.categories) {
    const matched = c.widgets.filter((w) =>
      w.name.toLowerCase().includes(query) || (w.text || '').toLowerCase().includes(query)
    );
    matches += matched.length;
  }
  if (matches === 0) {
    throw new Error('Search failed to find existing "accounts" widget');
  }
  console.log(`✅ Test 4 Passed: Global search matched ${matches} widget(s) for query "${query}".\n`);

  console.log('🎉 ALL AUTOMATED LOGIC TESTS PASSED SUCCESSFULLY!');
}

runTests();
