# Official ACC Website

A first local version of Kent State University's Asian Culture Club website.

## Preview

Open this folder in VS Code. In its terminal run:

    npm run dev

Visit http://127.0.0.1:3000. Node.js is the only prerequisite; no dependency installation is needed. You can also open index.html directly for a quick preview.

## Files

- index.html — page sections and club copy
- styles.css — cream, teal, and coral theme and phone layouts
- content.js — confirmed events, event photos, and officer profiles
- app.js — calendar navigation, content rendering, and phone menu
- assets/ — approved images
- server.js — local preview server, not a production backend

## Update content

Edit the arrays in content.js using its commented examples. Dates must use YYYY-MM-DD format. All events are interpreted as local club dates. Calendar arrows navigate months; Today selects today's date; clicking a selected date again returns to upcoming events. Events appear as dots on their dates.

Photos require src, alt, and caption. Officers require name, role, and bio, with an optional photo. Store images in assets and use paths such as assets/game-night.jpg. Only publish photos approved for the club website. The illustrated gallery and officer placeholders are automatically replaced when real entries are added.

## Content status

The club mission was paraphrased from https://www.kent.edu/csi/asian-culture-club . Instagram (@kentstateacc) is linked, but its posts could not be retrieved during development. No event dates, officer identities, or event photos have been invented. Event and officer data are deliberately empty until confirmed. Membership links go to the club's official Kent State organization page.

## Next steps

1. Review the colors and layout with the visual designer.
2. Add the approved logo, event photos, current officers, and confirmed dates.
3. Confirm the membership destination and add an approved suggestion form if desired.
4. Choose whether officers prefer editing content.js or using a shared Google Calendar. Calendar synchronization and an editing dashboard are not connected in this version.
5. Select hosting and a domain after review. This version has not been published.

This is a static public site. There are no member accounts, database, or form submissions. npm run check verifies JavaScript syntax.
