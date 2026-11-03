# Chef Yard delivery outcomes

## Restaurant navigation and brand
- [x] Keep Home, About, Cart, and Checkout out of the primary navbar and add them to the footer navigation.
- [x] Add a Menu dropdown with Full Menu, Set Menu, Special Items, Beverages, and Desserts links.
- [x] Resize the desktop logo mark to 56px, set the logo wordmark to 35px, and set the supporting line to 10px while keeping a responsive mobile scale.
- [x] Give the footer a distinctive restaurant identity with a produce ribbon, Explore and Order columns, location/hours, newsletter, social links, and direct Home/About/Cart/Checkout paths.
- [x] Apply a hand cursor to every button and preserve hover motion.

## Menu categories and ordering
- [x] Add dedicated routes for Set Menu, Special Items, Beverages, and Desserts.
- [x] Give each category seven image-backed items with local `/images/...` paths, prices, details, and direct Add-to-cart buttons.
- [x] Keep the all-menu page with category filtering and direct cart actions.

## Existing restaurant experience
- [x] Preserve Events and Book a Table pages with their booking forms.
- [x] Preserve the Australia-based palette, editorial typography, and subtle reveal/hover animations.

## Verification
- [x] `npm run check` passes.
- [x] `npm run build` passes and creates the FileZilla-ready static site in `dist/public/`.
- [x] All menu category routes return HTTP 200 on the clean npm dev server.
- [x] Desktop and mobile screenshots reviewed for menu, category, events, and footer layouts.
