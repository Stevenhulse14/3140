# CreateME: HTML + CSS Layout Challenge

## Goal
Recreate the layout shown in the reference image as closely as possible using **only HTML and CSS**.

## Rules
- ❌ No JavaScript
- ❌ No CSS frameworks (Bootstrap, Tailwind, etc.)
- ❌ No CSS libraries
- ✅ Pure HTML and CSS only

---

## Part 1: Structure Checklist

Your page should have these sections in order:

### Header Bar
- [ ] Logo pill on the left displaying "CISC 3140"
- [ ] Navigation items across the top (aligned horizontally)
- [ ] Small profile circle on the right side

### Hero Banner
- [ ] Small text: "Week 1 • Day 2"
- [ ] Large heading: "Git + GitHub Bootcamp"
- [ ] Subtitle line of text
- [ ] Dark button on the right: "Open Lesson Portal"

### Main Content Area (2-Column Layout)

**Left Column (~68% width):**
- [ ] Card: "Class Video" with a large video placeholder area
- [ ] Card: "Slide Deck" with 8 thumbnail "slides" arranged in a 2×4 grid (2 rows × 4 columns)

**Right Column (~32% width, sidebar):**
- [ ] Card: "Today's Checklist" with checkboxes and text items
- [ ] Card: "Quick Links" with 4 pill-shaped buttons/rows

### Footer
- [ ] One muted line of text at the bottom

---

## Part 2: File Setup

Create these files in your project:

```
your-project/
├── index.html
├── styles.css
└── assets/          (optional, for images)
```

---

## Part 3: Layout Hints

### Container Setup
Use a centered container for your main content:
```css
max-width: 1200px;
margin: 0 auto;
padding: 64px;
```

### Grid Layout
Use CSS Grid for the main 2-column layout:
- Left column: ~68% width
- Right column: ~32% width

**Question:** Why use CSS Grid instead of Flexbox for this layout? When would Flexbox be better?

### Flexbox Usage
Use Flexbox for:
- Header alignment and navigation spacing
- Card internal layouts
- Button groups

### Design System
- **Border Radius:** Apply `border-radius` to cards, pills, thumbnails, and buttons
- **Spacing Scale:** Use an 8px scale: `8px, 16px, 24px, 32px, 64px`
- **Card Styling:** Light gray card background with slightly darker borders
- **Colors:** Use a consistent color palette (you can choose your own)

---

## Part 4: Minimum Requirements Rubric

Your submission must include:

- [ ] **Correct overall layout** - Header + Hero + 2-column grid structure
- [ ] **Cards with rounded corners** - Consistent padding and styling
- [ ] **Slide thumbnails** - Properly arranged in a 2×4 grid
- [ ] **Checklist items** - Aligned with checkboxes
- [ ] **Desktop responsive** - Looks good at desktop width (no mobile required yet)

---

## Part 5: Extra Credit Challenges

Pick any **3** of the following to implement:

### Challenge 1: Responsive Design
Make it responsive - stack the sidebar under the main content when the viewport is below ~900px width.

**Think about it:** What CSS technique would you use? Media queries? Flexbox direction change?

### Challenge 2: Hover States
Add interactive hover effects:
- Navigation items highlight on hover
- Cards lift slightly (use `transform: translateY()`)

**Think about it:** What CSS property creates smooth transitions? How do you make elements "lift"?

### Challenge 3: Embedded Video
Add a real embedded YouTube iframe in the video placeholder area (still no JavaScript required).

**Think about it:** How do you embed a YouTube video? What HTML element do you need?

### Challenge 4: CSS Variables
Use CSS custom properties (`:root`) for:
- Spacing values (8px, 16px, 24px, etc.)
- Color palette

**Think about it:** What's the benefit of CSS variables? How do you define and use them?

### Challenge 5: Accessibility
Add subtle shadows and focus styles for keyboard navigation.

**Think about it:** What CSS pseudo-class handles focus states? Why is this important?

---

## Part 6: Development Tips

### Before You Start
1. **Plan your HTML structure first** - Draw it out or write pseudo-code
2. **Identify reusable components** - Cards, buttons, pills
3. **Think about semantic HTML** - Use appropriate tags (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)

### While Building
1. **Build one section at a time** - Don't try to do everything at once
2. **Test frequently** - Check your layout in the browser often
3. **Use browser DevTools** - Inspect elements to debug spacing and alignment issues

### Common Pitfalls to Avoid
- ❌ Don't use inline styles
- ❌ Don't use `<table>` for layout (only for actual tabular data)
- ❌ Don't forget to reset default margins/padding
- ❌ Don't hardcode pixel values everywhere - use relative units where appropriate

---

## Part 7: Reflection Questions

After completing the layout, consider:

1. **Semantic HTML:** Did you use semantic HTML5 elements? Why is this important?

2. **CSS Organization:** How did you organize your CSS? Could you group related styles better?

3. **Maintainability:** If you needed to change the color scheme, how easy would it be? What could make it easier?

4. **Flexibility:** How would you modify this layout to support 3 columns instead of 2?

---

## Submission Checklist

Before submitting, verify:

- [ ] All required sections are present
- [ ] Layout matches the reference image closely
- [ ] Code is clean and well-organized
- [ ] No JavaScript was used
- [ ] No frameworks or libraries were used
- [ ] Page looks good at desktop width (1200px+)
- [ ] At least 3 extra credit challenges completed (if attempting)

Good luck! 🎨
