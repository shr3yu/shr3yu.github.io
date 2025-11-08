# Projects Folder

Add your project markdown files here. Each `.md` file will automatically appear as a document icon in the Projects popup.

## How to add a new project:

1. Create a new `.md` file in this folder (e.g., `MyProject.md`)
2. Add the filename (without `.md`) to the `PROJECTS_FILES` array in `src/pages/InfoPage.jsx`
3. The document icon will automatically appear with the filename as the title
4. When clicked, the markdown content will be displayed in a notepad popup

## File naming:
- Use descriptive names (e.g., `WebApp.md`, `MobileApp.md`)
- The filename (without extension) will be used as the document title
- Underscores and hyphens will be converted to spaces in the title

## Adding images:
- Place images in the `images/` folder within this directory
- Reference them in markdown using: `![alt text](image-name.png)`
- Example: `![Screenshot](screenshot.png)` will load from `projects/images/screenshot.png`
- Images will automatically scale to fit the notepad width

