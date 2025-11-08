# Experience Folder

Add your internship/experience markdown files here. Each `.md` file will automatically appear as a document icon in the Internships popup.

## How to add a new experience:

1. Create a new `.md` file in this folder (e.g., `SummerInternship.md`)
2. Add the filename (without `.md`) to the `EXPERIENCE_FILES` array in `src/pages/InfoPage.jsx`
3. The document icon will automatically appear with the filename as the title
4. When clicked, the markdown content will be displayed in a notepad popup

## File naming:
- Use descriptive names (e.g., `GoogleInternship.md`, `MicrosoftCoop.md`)
- The filename (without extension) will be used as the document title
- Underscores and hyphens will be converted to spaces in the title

## Adding images:
- Place images in the `images/` folder within this directory
- Reference them in markdown using: `![alt text](image-name.png)`
- Example: `![Team Photo](team.jpg)` will load from `experience/images/team.jpg`
- Images will automatically scale to fit the notepad width

