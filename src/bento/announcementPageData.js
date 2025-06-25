
import fig1 from "../assets/announcement/fig1.svg";
import fig2 from "../assets/announcement/fig2.svg";
import fig3 from "../assets/announcement/fig3.svg";
import fig4 from "../assets/announcement/fig4.svg";
import fig8 from "../assets/announcement/fig8.svg";
import fig9 from "../assets/announcement/fig9.svg";

export const announcementPageData = [
  {
    "title": "Datasets Update",
    "timestamp": "June 18, 2025",
    "image": fig9,
    "type": 1,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "This release includes newly harmonized data from the TARGET studies (phs000463, phs000464, phs000465) and PIVOT neuroblastoma PDX models data (phs003163), along with updates to several existing CCDI datasets."
  },
  {
    "title": "Data Model Update",
    "timestamp": "June 18, 2025",
    "image": fig8,
    "type": 1,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "The C3DC data model has been enhanced with a new synonym node to enable cross-study participant mapping via the CCDI Participant Index (CPI), allowing linkage of data across studies. The treatment node was also updated with new dose-related properties (dose, dose_unit, dose_route, dose_frequency). Additionally, new permissible values were added to various properties to support data organization and usability for newly suggested studies."
  },
  {
    "title": "Resource Update",
    "timestamp": "June 18, 2025",
    "image": fig1,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "We are excited to announce the release of the C3DC application version 1.6.0! This release includes the newly harmonized datasets phs000463, phs000464, phs000465, and phs003163 as well as updates to existing datasets. It also introduces enhancements to the Explore page, Cohort Analyzer, and Data Model Navigator as a new feature. These updates will enhance the user’s experience and provide more comprehensive data access. For full release details, please visit the <a href='/release_notes_pdf?existingUser' target='_blank'>Release Note</a>"
  },
  {
    "title": "Explore page (New Feature)",
    "timestamp": "June 18, 2025",
    "image": fig2,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "Users can now copy and share query URLs for a filtered view of the C3DC Explore Dashboard. This allows users to save faceted filters of participant data for later use or to share with other users. Once at least one facet is selected, a query URL will be generated below the summary counts ribbon in the C3DC Explore Dashboard. Users can then copy the URL or clear it to reset all applied filters."
  },
  {
    "title": "Cohort Selector",
    "timestamp": "June 18, 2025",
    "image": fig3,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "Flexible participant selection has been added, allowing users to include either all participants from a filtering of participants in the Create Cohort or just a selected subset from the faceted filtering. Note that this does not add all participants released in the C3DC to a cohort. The cohort list in <i>View All Cohorts</i> window now offers a clearer view of all cohorts and provides direct access button to the <i>Cohort Analyzer</i>. Users can also export cohorts (up to 600 participants) to the CCDI Hub with data pre-filtered by selected participants."
  },
  {
    "title": "Cohort Analyzer Improvement",
    "timestamp": "June 18, 2025",
    "image": fig4,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "Users can export their set of cohorts to a pre-filtered view within the C3DC Explore Dashboard for easier review of participant data. Export of participants in Cohort Analyzer as a pre-filtered view the CCDI Hub has also been added to simplify finding data files associated with those participants."
  },
  {
    "title": "Data Model Navigator",
    "timestamp": "June 18, 2025",
    "image": fig1,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "The C3DC Data Model can now be interactively browsed with the newly released Data Model Navigator, available from the ‘Data Model’ link at the top of the C3DC application page. The Data Model Navigator enables users to explore node entities, inspect their properties and expected values, and visualize the relationships between nodes."
  }
];

