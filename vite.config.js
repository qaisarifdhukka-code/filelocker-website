import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Registers every .hbs file in src/partials as a Handlebars partial
 * (e.g. header.hbs -> {{> header }}, footer.hbs -> {{> footer }})
 * and compiles each page's HTML through Handlebars at build/serve time.
 *
 * To add a new page later: drop a new .html file in the project root
 * (e.g. pricing.html) using {{> header }} / {{> footer }} like index.html,
 * then add it to build.rollupOptions.input below.
 */
function handlebarsPartials() {
  const partialsDir = resolve(__dirname, 'src/partials');

  function registerPartials() {
    Handlebars.unregisterPartial(Object.keys(Handlebars.partials || {}));
    fs.readdirSync(partialsDir)
      .filter((f) => f.endsWith('.hbs'))
      .forEach((file) => {
        const name = path.basename(file, '.hbs');
        const content = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
        Handlebars.registerPartial(name, content);
      });
  }

  registerPartials();

  return {
    name: 'handlebars-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        registerPartials(); // re-read partials so dev server hot-reloads header/footer edits
        const template = Handlebars.compile(html);
        return template({});
      },
    },
  };
}

export default defineConfig({
  plugins: [handlebarsPartials()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        security: resolve(__dirname, 'security.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        features: resolve(__dirname, 'features.html'),
        whoItsFor: resolve(__dirname, 'who-its-for.html'),
        lawyers: resolve(__dirname, 'lawyers.html'),
        photographers: resolve(__dirname, 'photographers.html'),
        accountants: resolve(__dirname, 'accountants.html'),
        healthcare: resolve(__dirname, 'healthcare.html'),
        faq: resolve(__dirname, 'faq.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
});
