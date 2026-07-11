# FreshCart 🛒

FreshCart is a full-featured e-commerce web application built with **Angular 21**. It offers a complete online shopping experience — browsing products, managing a cart and wishlist, checking out with Stripe, and tracking orders — wrapped in a fast, multi-language UI.

**Live Demo:** [Fresh Cart ](https://e-commerce-two-ruddy-11.vercel.app/login)

---

## ✨ Features

- **Authentication** — Register/login flow with JWT-based sessions, route guards for protected and guest-only pages
- **Product Catalog** — Browse products, categories, and brands, with pagination and a dedicated product details page
- **Shopping Cart** — Add, update, and remove items in real time
- **Wishlist** — Save favorite products for later
- **Checkout & Payments** — Secure checkout flow integrated with Stripe
- **Order History** — View all past orders
- **Multi-language Support** — English, Arabic, and German via `@ngx-translate`
- **Standalone Components** — Fully lazy-loaded, standalone-component routing (no NgModules)
- **Static Build (CSR)** — Deployed as a static build (`outputMode: "static"`) for reliable client-side routing on Vercel
- **Polished UX** — Toast notifications (`ngx-toastr`), alerts (`SweetAlert2`), loading spinners (`ngx-spinner`), and a carousel (`ngx-owl-carousel-o`)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular 21 (standalone components, static build) |
| Language | TypeScript |
| Styling | Tailwind CSS, Flowbite, Font Awesome |
| State/Reactivity | RxJS |
| i18n | @ngx-translate |
| Auth | JWT (`jwt-decode`) |
| UX Utilities | ngx-toastr, ngx-spinner, SweetAlert2, ngx-owl-carousel-o, ngx-pagination |
| Deployment | Vercel (static build) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Angular CLI](https://angular.dev/tools/cli) v21

### Installation

```bash
# Clone the repository
git clone https://github.com/omnia-404/E-Commerce.git

# Navigate into the project directory
cd E-Commerce

# Install dependencies
npm install

# Run the development server
npm start
```

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any source files.

---

## 🧱 Code Scaffolding

Angular CLI includes code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
```

For a full list of available schematics (components, directives, pipes, etc.):

```bash
ng generate --help
```

---

## 📦 Build

```bash
npm run build
```

The project builds as a **static** Angular app (`outputMode: "static"` in `angular.json`), so the output can be hosted on any static host. Build artifacts are output to `dist/FreshCart/browser`.

> Note: `main.server.ts` and `server.ts` exist in the project as Angular's default SSR scaffolding, but SSR is not active — the app builds and deploys as a static, client-side-rendered bundle.

---

## 🧪 Testing

```bash
npm test
```

Unit tests run with [Vitest](https://vitest.dev/).

### End-to-End Tests

```bash
ng e2e
```

Angular CLI doesn't ship with an e2e framework by default — this project doesn't currently include one. Add a tool like [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) if you need e2e coverage.

---

## 🌐 Deployment

Configured for deployment on [Vercel](https://vercel.com/) as a **static build**:

- `outputMode` set to `"static"` in `angular.json`
- Output directory: `dist/FreshCart/browser`
- A catch-all rewrite rule in `vercel.json` (`/(.*)` → `/index.html`) so Angular's client-side routing works correctly on refresh/direct navigation (e.g. after a Stripe redirect)

---

## 📁 Project Structure

```
E-Commerce/
├── public/
│   └── assets/
│       ├── i18n/            # Translation files (en, ar, de)
│       └── images/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── auth/         # Login & register components
│   │   │   ├── constants/
│   │   │   ├── guards/       # authGuard, guestGuard
│   │   │   ├── interceptors/
│   │   │   ├── layouts/      # auth-layout, main-layout
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── brands/
│   │   │   ├── cart/
│   │   │   ├── wishlist/
│   │   │   ├── checkout/
│   │   │   ├── details/
│   │   │   ├── allorders/
│   │   │   └── notfound/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   └── pipes/
│   │   └── app.routes.ts     # Lazy-loaded route configuration
│   ├── environments/
│   ├── main.ts               # App bootstrap (used for the static build)
│   └── main.server.ts        # Default Angular SSR scaffold (unused — app builds as static/CSR)
├── angular.json
├── vercel.json
└── package.json
```

---

## 🔑 Environment Variables

Update `src/environments/environment.ts` and `environment.development.ts` with your API base URL and Stripe key:

```typescript
export const environment = {
  production: false,
  apiUrl: 'YOUR_API_BASE_URL',
  stripePublicKey: 'YOUR_STRIPE_PUBLIC_KEY',
};
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/omnia-404/E-Commerce/issues).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📚 Additional Resources

For more on the Angular CLI, including detailed command references, check the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

## 👩‍💻 Author

**Omnia**
- GitHub: [@omnia-404](https://github.com/omnia-404)
