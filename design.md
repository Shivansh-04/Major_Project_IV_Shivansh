# CareerAI Design System

A quiet, editorial interface for making career decisions feel clearer. The visual language is minimal but distinctive: warm paper, near-black ink, chartreuse signals, and product details that feel useful rather than decorative.

## Design Direction

**Keywords:** editorial, intelligent, calm, focused, optimistic, precise.

CareerAI should feel like a thoughtful career instrument, not a generic job board or a loud AI product. Every page should help the user answer one question quickly and move toward one clear action.

Use generous whitespace, strong typographic hierarchy, restrained borders, and one memorable accent color. Prefer a few intentional elements over collections of cards.

## Color

Use CSS variables or Tailwind arbitrary values consistently:

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f5f3ee` | Main page background |
| Paper dark | `#e8e6df` | Secondary bands and panels |
| Ink | `#171816` | Primary text, borders, dark surfaces |
| Signal | `#a7d129` | Primary accent, active states, progress |
| Signal dark | `#7b951e` | Accent text on light backgrounds |
| Muted | `#6b6d65` | Secondary text and metadata |
| White | `#ffffff` | Text on ink surfaces |
| Soft green | `#dfe9ad` | Very subtle atmospheric highlight |
| Soft blue | `#bfdbf0` | Secondary match indicator |
| Soft orange | `#fed7aa` | Tertiary match indicator |

### Color Rules

- Keep most of the interface paper and ink.
- Use chartreuse for one important signal: an action, score, active state, or progress bar.
- Use soft blue and soft orange only as small supporting indicators.
- Do not default to purple gradients, blue SaaS palettes, or all-dark pages.
- Maintain strong contrast for body text and controls.

## Typography

Use an expressive geometric sans with a fallback stack. The typography should do much of the visual work.

- **Display headings:** very heavy weight, tight line-height around `0.88-0.95`, strongly negative tracking.
- **Section headings:** bold, tight line-height, negative tracking.
- **Body:** regular weight, `1.6-1.8` line-height, muted ink.
- **Labels:** bold, uppercase, `10-11px`, tracking around `0.16em-0.2em`.
- **Buttons:** semibold or bold, small-to-medium text, no all-caps unless very short.

Recommended heading treatment:

```jsx
<h1 className="text-[clamp(3.5rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.09em]">
  Find work that <span className="text-[#7b951e]">fits.</span>
</h1>
```

Avoid oversized display type inside compact cards or dashboards. Do not scale ordinary body text with viewport width.

## Layout

- Main content max width: `72rem` (`max-w-7xl`).
- Page padding: `1.5rem` mobile, `2.5rem` desktop.
- Section padding: roughly `5rem` mobile and `7-9rem` desktop.
- Use full-width bands for major sections; constrain content inside them.
- Use borders to divide content instead of nested floating cards.
- Prefer two-column layouts for a main story and three-column layouts for short principles.
- Keep the first viewport focused: navigation, one clear statement, one supporting visual, and one primary action.

## Navigation

Navigation is compact and quiet:

- Left: `career/ai` wordmark with the slash in chartreuse.
- Center: three to four short anchor links on desktop.
- Right: login as a text link and registration as a dark rectangular button.
- Hide secondary links on small screens; keep the logo and primary action visible.
- Use square or lightly rectangular buttons. Avoid excessive pill-shaped controls.

## Buttons and Links

### Primary Button

- Background: Signal (`#a7d129`).
- Text: Ink.
- Padding: about `1.5rem x 0.75rem`.
- Use a small directional symbol such as `->` or `↗`.
- Hover: Ink background with white text.

### Secondary Action

- Use an underlined text link with a chartreuse underline.
- Reserve outlined buttons for cases where the action genuinely needs more weight.

### Button Copy

Use direct, human language:

- `See my matches`
- `Build my profile`
- `Find your next hire`
- `Start your signal`

Avoid vague copy such as `Learn More`, `Explore Features`, or `Get Started` when a more specific action is possible.

## Product Visuals

When a page needs a visual, show the product or the result of using it. Prefer a single composed interface panel over decorative illustrations.

The homepage match panel uses:

- Ink surface with a thin translucent divider.
- Small uppercase status label.
- Large result title and one prominent match score.
- A thin progress bar in Signal.
- Three compact ranked result rows.
- Small metadata footer such as `Based on 42 signals`.
- Slight rotation and a hard chartreuse offset shadow for character.

Keep mock data clearly illustrative. Do not imply that sample scores are real user data.

## Information Hierarchy

A page should generally follow this order:

1. **Signal:** What is this page helping me decide?
2. **Proof:** What does the product actually understand or produce?
3. **Method:** How does the system create that result?
4. **Audience paths:** What can a candidate or company do next?
5. **Action:** One clear next step.

For feature sections, show three strong principles instead of nine equal feature cards whenever possible.

## Motion

Use motion sparingly and purposefully:

- Page content may reveal with a short fade or slight upward movement.
- Product panels may have a gentle hover lift or small rotation correction.
- Progress bars can animate once on entry.
- Keep transitions around `150-250ms`.
- Never make core information depend on animation.
- Respect `prefers-reduced-motion` for non-essential effects.

## Responsive Behavior

- At mobile widths, stack the hero content before the product visual.
- Keep the product visual within the viewport; reduce rotation, padding, and shadow offset if needed.
- Convert vertical dividers into horizontal borders.
- Hide desktop-only anchor navigation.
- Keep headings large but ensure words never overflow their container.
- Buttons may become full-width or stack vertically when two actions compete for space.
- Check at approximately `375px`, `768px`, and `1440px` widths.

## Copy Voice

Write with calm confidence and useful specificity.

- Short sentences.
- Concrete verbs.
- No inflated AI claims.
- Explain the benefit before the technology.
- Treat candidates and companies as equally important users.
- Prefer `clearer`, `fit`, `direction`, `signals`, and `next move` over jargon.

Example:

> CareerAI reads between the lines of your resume and the roles you want, then shows you the move with the most potential.

## Accessibility

- Use semantic landmarks: `main`, `nav`, `section`, `footer`.
- Every interactive element must have visible focus styling.
- Use real links for navigation and buttons for actions.
- Do not rely on color alone for match states or errors.
- Keep text contrast at accessible levels.
- Add `aria-hidden="true"` to decorative symbols.
- Preserve readable labels when icons are used.

## Do and Do Not

### Do

- Create one strong visual idea per page.
- Use paper, ink, and a single signal color as the foundation.
- Make product behavior visible through small, realistic interface details.
- Use hard-edged borders and shadows for intentional character.
- Keep sections breathable and easy to scan.

### Do Not

- Recreate a generic SaaS landing page with a hero plus many rounded cards.
- Use a full page of gradients or a purple-on-white palette.
- Add decorative shapes that compete with the product message.
- Use emoji as the primary icon system.
- Put explanatory feature text inside oversized hero cards.
- Add a new component pattern when an existing pattern already communicates the idea.

## Page Checklist

Before finalizing a redesigned page, verify:

- The first viewport communicates the page purpose immediately.
- There is one obvious primary action.
- The accent color is reserved for meaningful signals.
- The layout works at mobile, tablet, and desktop widths.
- No text overlaps, clips, or overflows its container.
- Interactive elements have hover and focus states.
- The page uses semantic HTML and accessible labels.
- The result feels like CareerAI, not a generic template.
- `npm run build` and `npm run lint` pass from `frontend/`.
