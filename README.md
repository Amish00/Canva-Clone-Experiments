# Canva Clone

A **Canva-like web design editor** built using **React, Vite, TailwindCSS, and LidoJS**.
This application allows users to create simple graphic designs by adding **text, emojis, and elements** on a canvas and exporting the final design.

## Features

* Drag and edit text elements
* Emoji picker integration
* Canvas-based design editor
* Export design as image or PDF
* State management using Zustand
* Responsive modern UI
* Fast development with Vite

## Tech Stack

**Frontend**

* React
* Vite
* TailwindCSS

**Libraries**

* LidoJS Design Editor
* Emoji Mart
* Zustand (State Management)
* Lucide React (Icons)
* html2canvas (Export canvas to image)
* jsPDF (Export to PDF)

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/canva-clone.git
cd canva-clone
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will start at:

```
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
canva-clone
│
├── src
│   ├── components      # UI components
│   ├── store           # Zustand state management
│   ├── utils           # Helper functions
│   ├── App.jsx
│   └── main.jsx
│
├── public              # Static files
├── index.html
├── vite.config.js
└── package.json
```

## Dependencies

Main dependencies used in this project:

* react
* react-dom
* @lidojs/design-core
* @lidojs/design-utils
* @lidojs/text-editor
* emoji-mart
* html2canvas
* jspdf
* lucide-react
* zustand

## Development Tools

* ESLint
* TailwindCSS
* PostCSS
* Vite React Plugin

## Future Improvements

* Add image upload support
* Add templates
* Save designs to database
* User authentication
* Cloud storage integration

## License

This project is for **learning and educational purposes**.

---

If you want, I can also make a **more professional GitHub README (with screenshots, badges, and demo section)** which makes the repo look much more impressive for **portfolio or university project submission**.
