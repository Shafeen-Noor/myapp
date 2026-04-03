import { test, expect } from '@playwright/test';

const today = new Date().toISOString().split('T')[0];

async function goToApod(page) {
	await page.goto('/', { waitUntil: 'networkidle' });
	const heading = page.getByRole('heading', { name: 'Explore the Cosmos' });
	await heading.waitFor({ state: 'visible', timeout: 15000 });
}

async function goToNeo(page) {
	await page.goto('/', { waitUntil: 'networkidle' });
	await page.getByRole('button', { name: /Asteroid Watch/i }).click();
	await expect(page.getByRole('heading', { name: 'Asteroid Watch' })).toBeVisible();
}

async function waitForApodData(page) {
	const card = page.locator('.apod-card');
	const noData = page.getByText('No data available');

	await page.waitForFunction(
		() => {
			return !!document.querySelector('.apod-card') || !!document.querySelector('.apod-no-data');
		},
		null,
		{ timeout: 60000 }
	);

	if (await card.isVisible()) {
		await expect(card.locator('.apod-card__title')).toBeVisible();
		await expect(card.locator('.apod-card__description')).toBeVisible();
	} else {
		await expect(noData).toBeVisible();
	}
}

// ─────────────────────────────────────────────────────────────
// Shell
// ─────────────────────────────────────────────────────────────
test.describe('Shell', () => {
	test.beforeEach(async ({ page }) => {
		await goToApod(page, { timeout: 60000 });
	});

	test('shows the observatory bar logo', async ({ page }) => {
		await expect(page.getByText('✦ COSMOS OBSERVER')).toBeVisible();
	});

	test('shows both nav items', async ({ page }) => {
		await expect(page.getByRole('button', { name: /Picture of the Day/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Asteroid Watch/i })).toBeVisible();
	});

	test('APOD view is active by default', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Explore the Cosmos' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Asteroid Watch' })).toBeHidden();
	});

	test('navigates to NEO view when Asteroid Watch is clicked', async ({ page }) => {
		await page.getByRole('button', { name: /Asteroid Watch/i }).click();
		await expect(page.getByRole('heading', { name: 'Asteroid Watch' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Explore the Cosmos' })).toBeHidden();
	});

	test('navigates back to APOD from NEO', async ({ page }) => {
		await page.getByRole('button', { name: /Asteroid Watch/i }).click();
		await page.getByRole('button', { name: /Picture of the Day/i }).click();
		await expect(page.getByRole('heading', { name: 'Explore the Cosmos' })).toBeVisible();
	});
});

// ─────────────────────────────────────────────────────────────
// APOD View
// ─────────────────────────────────────────────────────────────
test.describe('APOD View', () => {
	test.beforeEach(async ({ page }) => {
		await goToApod(page);
	});

	test('renders eyebrow and main heading', async ({ page }) => {
		await expect(page.getByText('NASA · Astronomy Picture of the Day')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Explore the Cosmos' })).toBeVisible();
	});

	test('renders date picker and Receive Signal button', async ({ page }) => {
		const dateInput = page.getByLabel('Transmission Date');
		await dateInput.waitFor({ state: 'visible', timeout: 15000 });
		await expect(page.getByRole('button', { name: 'Receive Signal' })).toBeVisible();
	});

	test('renders "Receive Signal" button', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Receive Signal' })).toBeVisible();
	});

	test('date input max is today', async ({ page }) => {
		await expect(page.getByLabel('Transmission Date')).toHaveAttribute('max', today);
	});

	test('date input min is 1995-06-16', async ({ page }) => {
		await expect(page.getByLabel('Transmission Date')).toHaveAttribute('min', '1995-06-16');
	});

	test("auto-loads today's picture or no-data", async ({ page }) => {
		await waitForApodData(page);
	});

	test('shows loading indicator while fetching', async ({ page }) => {
		await page.getByLabel('Transmission Date').fill('2024-01-15');
		await page.getByRole('button', { name: 'Receive Signal' }).click();
		await expect(page.locator('.status--loading')).toBeVisible();
	});

	test('renders card with title and description after fetch', async ({ page }) => {
		await expect(page.locator('.apod-card')).toBeVisible({ timeout: 60000 });
		await expect(page.locator('.apod-card__title')).toBeVisible();
		await expect(page.locator('.apod-card__description')).toBeVisible();
	});

	test('fetching a different date replaces the card or shows no-data', async ({ page }) => {
		await page.goto('/');

		const card = page.locator('.apod-card');
		const noData = page.getByText('No data available');

		await page.getByLabel('Transmission Date').fill('2023-06-01');
		await page.getByRole('button', { name: 'Receive Signal' }).click();

		await Promise.race([card.waitFor({ timeout: 60000 }), noData.waitFor({ timeout: 60000 })]);

		if (await card.isVisible()) {
			await expect(card).toBeVisible();
			await expect(card.locator('.apod-card__title')).toBeVisible();
			await expect(card.locator('.apod-card__description')).toBeVisible();
		} else {
			await expect(noData).toBeVisible();
		}
	});
});

// ─────────────────────────────────────────────────────────────
// NEO View
// ─────────────────────────────────────────────────────────────
test.describe('NEO View', () => {
	test.beforeEach(async ({ page }) => {
		await goToNeo(page);
	});

	test('renders eyebrow and main heading', async ({ page }) => {
		await expect(page.getByText('NASA · Near Earth Objects')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Asteroid Watch' })).toBeVisible();
	});

	test('renders the orbit visual', async ({ page }) => {
		await expect(page.locator('.neo-orbit-visual')).toBeVisible();
	});

	test('renders date picker with label "Transmission Date"', async ({ page }) => {
		await expect(page.getByLabel('Transmission Date')).toBeVisible();
	});

	test('date picker allows future dates (max 2100-12-31)', async ({ page }) => {
		await expect(page.getByLabel('Transmission Date')).toHaveAttribute('max', '2100-12-31');
	});

	test("auto-loads today's NEOs on mount", async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
	});

	test('shows at least one asteroid card after load', async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
		await expect(page.locator('.neo-card').first()).toBeVisible();
	});

	test('shows object count summary', async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
		await expect(page.locator('.neo-list__count')).toBeVisible();
		await expect(page.locator('.neo-list__count')).toContainText('detected');
	});

	test('expands a NEO card on click to reveal details', async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
		const firstTrigger = page.locator('.neo-card__trigger').first();
		await firstTrigger.click();
		await expect(page.locator('.neo-card__details').first()).toBeVisible();
	});

	test('expanded card shows velocity stat', async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
		await page.locator('.neo-card__trigger').first().click();
		await expect(page.locator('.neo-card__details').first().getByText(/km\/h/i)).toBeVisible();
	});

	test('collapses the card on second click', async ({ page }) => {
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
		const firstTrigger = page.locator('.neo-card__trigger').first();
		await firstTrigger.click();
		await expect(page.locator('.neo-card__details').first()).toBeVisible();
		await firstTrigger.click();
		await expect(page.locator('.neo-card__details').first()).toBeHidden();
	});

	test('fetches NEOs for a future date', async ({ page }) => {
		await page.getByLabel('Transmission Date').fill('2026-12-25');
		await page.getByRole('button', { name: 'Receive Signal' }).click();
		await expect(page.locator('.neo-list')).toBeVisible({ timeout: 60000 });
	});
});
