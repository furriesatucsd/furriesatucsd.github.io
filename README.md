# Triton Tails - Furries at UCSD Website

This is the official website for Triton Tails, the furry student organization at UC San Diego.

## Technology Stack

This website uses:
- [11ty](https://www.11ty.dev/) - Static site generator
- [Vite](https://vitejs.dev/) - Modern frontend build tool
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Sass](https://sass-lang.com/) - CSS preprocessor

## Development

To set up the project for development:

1. Clone the repository
   ```
   git clone https://github.com/furriesatucsd/furriesatucsd.github.io.git
   cd furriesatucsd.github.io
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run start
   ```

This will:
- Build the site with Vite and 11ty
- Start a local development server

## Build

To build the site for production:

```
npm run build
```

The compiled site will be in the `dist` folder.

## Adding Content

Content is written in Nunjucks templates and Markdown files. The site structure follows the 11ty conventions:

- `src/` - Source files
  - `_includes/` - Reusable components
  - `_layouts/` - Page templates
  - `assets/` - Static assets (CSS, JS, images)

## License

ISC 