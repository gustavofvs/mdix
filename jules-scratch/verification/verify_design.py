from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context(
        viewport={'width': 1280, 'height': 1024} # Desktop-like viewport
    )
    page = context.new_page()

    try:
        page.goto("http://localhost:3000")

        # Wait for the main heading to be visible
        expect(page.get_by_role("heading", name="Conversor Bitcoin")).to_be_visible(timeout=10000)

        # Wait a little bit for the scroll animations to trigger
        page.wait_for_timeout(2000)

        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)

        print("Screenshot captured successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot even on error for debugging
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
