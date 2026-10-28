# Official ACC Website

Public website for Kent State University's Asian Culture Club. Built with HTML, CSS, and JavaScript, with no installed dependencies.

## Preview

In the VS Code terminal, run `npm run dev`, then visit http://127.0.0.1:3000. Node.js is required. The preview server is local only, not a production backend.

## Pages and content

- index.html — homepage, About, calendar artwork, gallery, officer-page invitation, FAQ, and membership links.
- officers.html — dedicated page for all 11 officer positions, including two co-presidents.
- content.js — editable calendar details, gallery photos, and officer names, roles, descriptions, and portraits.
- styles.css — Kent State blue (#003976) and gold (#EFAB00), with beige, warm yellow, and red accents. Primary colors follow https://www.kent.edu/brand/swatches .
- app.js — content rendering and responsive navigation.
- assets/ — calendar artwork and approved photographs.

## Calendar updates

Replace the calendar image in assets/ and update `calendar.src`, `calendar.title`, `calendar.alt`, and `calendar.dates` in content.js. The image displays in full without cropping and opens at full size when clicked. Keep the readable date list synchronized with the artwork. The supplied October graphic is labeled as an example, with no year inferred. Update the status note in index.html when publishing a confirmed current calendar.

## Officer updates

Each position already has an entry in content.js. Add the confirmed name and an image path such as `assets/officer-name.jpg`. Until then, the page uses a clearly labeled portrait placeholder. Role descriptions are starter summaries for club review. The listed positions are two co-presidents, secretary, treasurer, social media lead, visual design lead, visual design intern, social media intern, event coordinator, event coordinator intern, and membership.

## Gallery updates

Add approved images to assets/ and entries to `photos` in content.js, with `src`, descriptive `alt`, and `caption`. These replace the illustrated placeholders automatically.

## Scope

The About section welcomes cultures across East, Southeast, South, Central, and West Asia, explicitly including Arab and Indian cultures and Muslim communities, alongside people of every faith and background. Initial club context came from https://www.kent.edu/csi/asian-culture-club and was expanded using the club's requested wording. Instagram is linked at @kentstateacc. Names and real portraits have not been invented.

No database, member login, forms backend, or calendar synchronization is connected. Membership links lead to the club's official Kent State organization page. This version has not been published.
