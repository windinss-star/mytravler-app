# Travel Youtuber Course App Design

Date: 2026-03-16
Status: Draft approved in conversation

## 1. Overview

This service is an informational travel app that helps users explore real travel routes followed by selected Korean travel YouTubers. Users can choose a country, city, or YouTuber and then inspect curated travel courses on a map. The service focuses on structured, reliable course data rather than broad travel search.

The initial release target is Apps in Toss. The app will use Toss Design System (TDS) patterns and Apps in Toss constraints. Authentication is Toss-only for the first release, with future expansion planned for other login providers such as Naver, Kakao, and Google.

The first release will launch with 6 curated YouTubers selected by the operator:

- Pani Bottle
- KwakTube
- Wonji's Diary
- Nomad Sion
- Czechj
- JanJanBari

The system should be designed so the YouTuber set can later expand to 20 or more channels without changing the core information architecture.

## 2. Product Goals

### Primary Goal

Launch an Apps in Toss app service that lets users quickly understand and follow travel routes created from selected Korean travel YouTubers' real trips.

### User Value

- Discover countries and cities through familiar YouTubers
- Understand a travel route at a glance through course-level map visualization
- Review practical details for each stop without reading long descriptions
- Revisit recently viewed countries and courses

### Product Positioning

The service is not a general travel encyclopedia. It is a curated, map-driven course discovery product built around YouTuber travel context.

## 3. Core Product Strategy

The recommended product strategy combines:

- A curation-first operating model
- A course-tracking user experience

This means the service experience centers on following YouTuber travel courses, while the data supply side uses curated YouTuber selection and rules-based automated collection and verification.

## 4. Scope

### Initial Release Scope

- Apps in Toss only
- Toss login only
- No guest browsing
- 6 curated YouTubers
- Country, city, course, and place browsing
- Course map visualization using points and lines
- Place detail pages with short practical summaries
- Personalized areas for recent views, favorite countries, and favorite YouTubers
- Notification settings and policy pages in My

### Explicitly Out of Scope for Initial Release

- User-created travel courses
- Full open-world map browsing as a primary tab
- Deep encyclopedic place descriptions
- Broad travel inventory beyond curated YouTuber data

## 5. Information Architecture

The core entities are:

- YouTuber
- Country
- City
- Course
- Place

Navigation structure:

- Home
- Country
- YouTuber
- My

There will be no dedicated Map tab in the first release. Map visualization is treated as a course exploration tool inside the browsing flow, not as the top-level navigation entry point.

### Home

Home is the main exploration hub. It should prominently expose:

- Search
- Country selection
- YouTuber selection

Personalized content such as recently viewed countries or courses can be shown lower on the page.

### Search

Search supports:

- Country name
- City name
- YouTuber name
- Place name

Detailed filters are part of the search experience so that "integrated exploration" does not need a separate tab.

### Country Tab

The Country tab starts with a country list ordered by Korean alphabetical order.

Country detail screen:

- Top area: YouTuber icons for YouTubers who visited that country
- Below that: favorite countries section
- Below that: list of cities in the selected country

Interaction flow:

- Tapping a YouTuber icon filters representative course cards for that YouTuber in the selected country
- Tapping a city shows representative course cards for that city
- Tapping a course card opens the map view

### YouTuber Tab

The YouTuber tab contains:

- Top area: favorite YouTubers
- Below: full YouTuber list

The YouTuber list supports sorting by subscriber count. Subscriber count is collected and refreshed weekly.

### My Tab

My contains:

- Recently viewed countries and courses
- Favorite YouTubers
- Notification settings
- Terms and policy pages
- Account-related information

## 6. Course and Map Experience

The app centers on course exploration, not just place lookup.

Course browsing flow:

Home/Country/YouTuber -> Course card -> Map view -> Course detail depth -> Place detail

### Course Cards

Each course card shows:

- Course name
- YouTuber name
- City
- Representative image
- Number of places in the course

Representative image policy:

- First choice: official map/platform image associated with the place
- Fallback: safe, stylized 3D icon asset
- Do not use YouTube video frames or thumbnails as representative course/place images

### Map View

Map view should show the selected course using:

- Points for stops
- Lines for route flow

The first map-focused view should stay at the course level so users can understand the route structure quickly. The next layer shows richer detail such as trip day, order of visits, and place breakdown.

### Course Detail Summary

The top summary should combine:

- Trip context such as "day 2 of a 3-night, 4-day trip"
- Number of places in the course
- Movement summary such as walking, vehicle, or mixed flow

Important note: "date" here means trip day context, not calendar date.

## 7. Place Detail Design

Place detail pages should stay concise and practical.

### Description Policy

- Maximum 5 summary keywords
- Maximum 3 lines of explanatory text
- Focus on context and practical use
- Assume users can perform general search elsewhere if they want much more detail

### Place Types

Supported place types in the initial release:

- Restaurant (including cafes)
- Tourist attraction
- Lodging

### Place-Type Specific Data

Restaurant:

- Ordered menu items
- Price
- YouTuber's food impression

Tourist attraction:

- Opening hours
- Admission fee

Lodging:

- Hotel star rating if applicable
- Lodging type such as hotel or hostel
- Average price

Common fields can include:

- Location
- Visit order within the course
- Verification status
- Data collection or posting date for time-sensitive details

## 8. Data Collection and Verification

The operating model is automated collection plus rules-based validation.

### Source Priority

1. YouTube video subtitles or on-screen text
2. YouTube comments
3. Naver blog posts
4. Google Maps reviews written by Korean users

### Reliability Rules

- Information directly stated in YouTube subtitles/on-screen text is treated as the highest-confidence source
- Comment, blog, and review-based information is accepted only if at least 3 separate supporting items align
- Location existence and YouTuber visit context both need validation

### Handling Volatile Information

Fields such as opening hours, prices, and menu details are treated as time-sensitive:

- They may still be shown if useful
- They should include the data collection date or source posting date
- They should show a caution state such as "confirmation needed"
- The UI should clearly tell users that the latest information may require real-time search

## 9. Personalization

The initial release includes lightweight personalization.

Supported features:

- Favorite YouTubers
- Favorite countries
- Recently viewed countries
- Recently viewed courses

Favorite YouTubers can drive notifications when new courses are added.

The app will not support user-generated course planning in the first release.

## 10. Authentication and Notifications

### Authentication

The service will use Apps in Toss login only for the initial release.

User assumptions:

- No guest browsing
- Users enter through Toss
- First authentication may require login and agreement screens
- After initial authorization, the app can behave like streamlined login through the Apps in Toss login flow

Future expansion can add Naver, Kakao, and Google simple login when the product later expands beyond Apps in Toss.

### Notifications

The service should prepare for two classes of notifications:

- Informational notifications
- Advertising notifications

Advertising notifications require explicit user consent and compliance with Apps in Toss push rules. Notification settings should therefore live in My from the first release even if notification campaigns are rolled out later.

Reference sources:

- https://developers-apps-in-toss.toss.im/login/develop.html
- https://developers-apps-in-toss.toss.im/faq.html
- https://developers-apps-in-toss.toss.im/intro/overview.html
- https://developers-apps-in-toss.toss.im/checklist/push.html
- https://developers-apps-in-toss.toss.im/push/qa.html

## 11. Design Principles

- Keep exploration simple and layered
- Favor curated trust over broad coverage
- Use the map for route comprehension, not for overwhelming discovery
- Keep place descriptions short
- Present practical information with caution when freshness is uncertain
- Build data models and pipelines to support expansion from 6 to 20+ YouTubers later

## 12. Risks and Mitigations

### Risks

- Incorrect place matching
- Outdated price or opening-hours information
- Copyright or licensing issues for images
- Inconsistent data quality across YouTubers
- Expansion cost grows sharply as YouTuber count rises

### Mitigations

- Prioritize subtitle-derived evidence
- Require cross-source agreement for lower-confidence inputs
- Use official map/platform images only, with safe fallback assets
- Mark volatile data with freshness warnings
- Start with 6 YouTubers while designing for later scale

## 13. Open Implementation Direction

The implementation plan should be created after this design is user-reviewed and approved. The plan should explicitly cover:

- Data ingestion and validation pipeline
- Canonical models for country, city, course, and place
- Apps in Toss authentication integration
- Map provider strategy and rendering scope
- TDS-based screen system and navigation patterns
- Personalization storage and notification triggers
