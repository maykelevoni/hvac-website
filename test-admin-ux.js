import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();

  console.log('🔍 Testing Admin Panel UX on Mobile...\n');

  try {
    // Test 1: Navigate to admin login
    console.log('1. Loading admin login page...');
    await page.goto('http://localhost:5173/admin/login');
    await page.waitForTimeout(2000);

    // Check if form is visible
    const loginVisible = await page.isVisible('.admin-login-card');
    console.log(`   ✓ Login form visible: ${loginVisible}`);

    // Take screenshot
    await page.screenshot({ path: 'screenshot-admin-login.png' });

    // Test 2: Check navigation after login (simulate by going directly to dashboard)
    console.log('\n2. Navigating to dashboard...');
    await page.goto('http://localhost:5173/admin/dashboard');
    await page.waitForTimeout(2000);

    // Check header visibility
    const headerVisible = await page.isVisible('.admin-header');
    console.log(`   ✓ Header visible: ${headerVisible}`);

    // Check navigation visibility
    const navVisible = await page.isVisible('.admin-nav');
    console.log(`   ✓ Navigation visible: ${navVisible}`);

    // Check if nav items fit without scrolling
    const navLinks = await page.$$('.admin-nav-link');
    console.log(`   ✓ Navigation items count: ${navLinks.length}`);

    // Check stats grid
    const statsVisible = await page.isVisible('.stats-grid');
    console.log(`   ✓ Stats grid visible: ${statsVisible}`);

    const statCards = await page.$$('.stat-card');
    console.log(`   ✓ Stat cards count: ${statCards.length}`);

    // Check table/cards visibility
    const tableVisible = await page.isVisible('.leads-table');
    console.log(`   ✓ Leads table visible: ${tableVisible}`);

    // Take screenshot
    await page.screenshot({ path: 'screenshot-admin-dashboard.png', fullPage: true });

    // Test 3: Check readability
    console.log('\n3. Checking element sizes and readability...');

    const navLinkSize = await page.evaluate(() => {
      const link = document.querySelector('.admin-nav-link');
      if (!link) return null;
      const rect = link.getBoundingClientRect();
      const styles = window.getComputedStyle(link);
      return {
        width: rect.width,
        height: rect.height,
        fontSize: styles.fontSize,
        padding: styles.padding
      };
    });
    console.log(`   Nav link:`, navLinkSize);

    const statCardSize = await page.evaluate(() => {
      const card = document.querySelector('.stat-card');
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      const value = card.querySelector('.stat-value');
      const label = card.querySelector('.stat-label');
      return {
        width: rect.width,
        height: rect.height,
        valueFontSize: value ? window.getComputedStyle(value).fontSize : 'N/A',
        labelFontSize: label ? window.getComputedStyle(label).fontSize : 'N/A'
      };
    });
    console.log(`   Stat card:`, statCardSize);

    // Test 4: Test interaction
    console.log('\n4. Testing interactions...');

    // Try clicking a nav link
    const navLink = await page.$('.admin-nav-link');
    if (navLink) {
      const isClickable = await navLink.isEnabled();
      console.log(`   ✓ Nav link clickable: ${isClickable}`);
    }

    // Test 5: Check for overflow issues
    console.log('\n5. Checking for overflow issues...');

    const overflowIssues = await page.evaluate(() => {
      const issues = [];
      const viewport = { width: window.innerWidth, height: window.innerHeight };

      // Check if elements overflow viewport
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > viewport.width) {
          const styles = window.getComputedStyle(el);
          if (styles.overflow !== 'hidden' && styles.overflowX !== 'hidden' &&
              styles.overflow !== 'auto' && styles.overflowX !== 'auto') {
            issues.push({
              element: el.className || el.tagName,
              width: rect.width,
              viewportWidth: viewport.width
            });
          }
        }
      });

      return issues.slice(0, 5); // Return first 5 issues
    });

    if (overflowIssues.length > 0) {
      console.log(`   ⚠️  Found ${overflowIssues.length} overflow issues:`);
      overflowIssues.forEach(issue => {
        console.log(`      - ${issue.element}: ${issue.width}px (viewport: ${issue.viewportWidth}px)`);
      });
    } else {
      console.log(`   ✓ No overflow issues detected`);
    }

    // Test 6: UX Problems Summary
    console.log('\n📋 UX ANALYSIS SUMMARY:\n');

    const problems = [];

    // Check navigation
    if (navLinks.length > 2) {
      problems.push({
        issue: 'Too many navigation items for mobile',
        severity: 'HIGH',
        suggestion: 'Hide "Photos" and "Settings" on mobile, keep only Dashboard and Leads'
      });
    }

    // Check stats grid
    if (statCards.length === 6) {
      problems.push({
        issue: 'Stats grid has 6 cards - too much information',
        severity: 'HIGH',
        suggestion: 'Show only 3 most important stats (Total, New, Contacted) on mobile'
      });
    }

    // Check font sizes
    if (navLinkSize && parseFloat(navLinkSize.fontSize) < 14) {
      problems.push({
        issue: `Navigation font too small (${navLinkSize.fontSize})`,
        severity: 'MEDIUM',
        suggestion: 'Increase to minimum 14px for better readability'
      });
    }

    problems.forEach((problem, index) => {
      console.log(`${index + 1}. [${problem.severity}] ${problem.issue}`);
      console.log(`   💡 ${problem.suggestion}\n`);
    });

    console.log('\n✅ Test complete! Check screenshots for visual reference.');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  }

  await page.waitForTimeout(3000);
  await browser.close();
})();
