# CV Template - Vue 3 + TypeScript

A modern, responsive resume template built with Vue 3, TypeScript, and Vite.

## ✨ Features

- 📝 **Live Editor** - Edit your resume in real-time
- 💾 **Auto-Save** - Automatic saving to localStorage
- 📄 **JSON Resume Schema** - Standardized format
- 🎨 **Print Optimized** - Perfect for PDF export
- 🔄 **Import/Export** - Upload and download JSON files
- 🎯 **Type-Safe** - Fully typed with TypeScript
- 🚀 **Modern Stack** - Vue 3 Composition API, Pinia, Vue Router
- 🎨 **Theming** - CSS Custom Properties for easy customization

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 📦 Scripts

- `npm run dev` - Starts the development server (Port 3000)
- `npm run build` - Creates production build
- `npm run preview` - Preview of production build
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - TypeScript type checking

## 📁 Project Structure

```
src/
├── components/         # Vue components
│   ├── editor/        # Editor components
│   ├── resume/        # Resume components
│   └── ToastContainer.vue
├── composables/       # Reusable composables
├── constants/         # Constants and configuration
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── views/            # View components
```

## 🎨 Customization

### Customize Theme

Colors can be customized via CSS Custom Properties in `src/App.vue`:

```css
:root {
  --color-primary: #0e5091;
  --color-success: #28a745;
  /* ... more colors */
}
```

### JSON Resume Format

The project uses the [JSON Resume Schema](https://jsonresume.org/schema/). Sample data can be found in `public/cv-data.json`.

## 🔧 Technologies

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next Generation Frontend Tooling
- **Pinia** - State Management
- **Vue Router** - Routing
- **Font Awesome** - Icons
- **Paged.js** - Print Optimization

## 📝 Usage

1. Open the app in your browser
2. Click "Edit" to go to the editor
3. Edit your data in the editor
4. Data is automatically saved
5. Switch to the resume view to see the result
6. Use the "PDF/Print" button to create a PDF

## 🤝 Contributing

Contributions are welcome! Please create a pull request.

## 📄 License

MIT License

## 🌟 Credits

Built with Vue 3, TypeScript and ❤️
