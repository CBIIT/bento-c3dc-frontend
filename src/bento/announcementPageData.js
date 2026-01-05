
import fig1 from "../assets/announcement/fig1.svg";
import fig2 from "../assets/announcement/fig2.svg";
import fig3 from "../assets/announcement/fig3.svg";
import fig4 from "../assets/announcement/fig4.svg";
import fig9 from "../assets/announcement/fig9.svg";

export const announcementPageData = [
  {
    "title": "Datasets Update",
    "timestamp": "February 4, 2026",
    "image": fig9,
    "type": 1,
    "is_release_notes": true,
    "alt": "abstract depiction of binary on a screen",
    "verbiage": "This release includes newly harmonized data for the following studies: phs001228, phs001714, phs001738, phs001846, phs001878, phs002187, phs002322, and phs003215 along with updates to several existing CCDI datasets. These new datasets add approximately 36,219 participants."
  },
  {
    "title": "Resource Update",
    "timestamp": "February 4, 2026",
    "image": fig1,
    "type": 2,
    "is_release_notes": true,
    "alt": "Hand holding a yellow and red megaphone against a red and teal background with the text \"C3DC News.\"",
    "verbiage": "We are pleased to announce the release of C3DC Application Version 1.8.0. This release introduces newly harmonized datasets, along with updates to existing data. It also includes key enhancements to the Explore Page and Cohort Analyzer, improving usability and expanding data accessibility. For complete details, please refer to the Release Notes."
  },
  {
    "title": "Explore page (New Feature)",
    "timestamp": "February 4, 2026",
    "image": fig2,
    "type": 2,
    "is_release_notes": true,
    "alt": "Woman sitting in front of two monitors writing code",
    "verbiage": "The Explore Page now includes a redesigned facet panel that displays facets in a horizontal view when a data category is selected, allowing users to easily expand or collapse individual facets. Table view enhancements also allow users to customize which columns are displayed by toggling them on or off using a checkbox list, while required columns remain fixed."
  },
  {
    "title": "Cohort Selector",
    "timestamp": "February 4, 2026",
    "image": fig3,
    "type": 2,
    "is_release_notes": true,
    "alt": "two hands on a laptop typing",
    "verbiage": "The Cohort Selector now supports copying cohorts, allowing users to add or remove participants across studies. Copied cohorts retain the same participants and description, with \"Copy X\" added to the name. A 20-cohort limit is enforced with clear indicators. Data integration has also been improved through live API calls to retrieve synonyms from CPI."
  },
  {
    "title": "Cohort Analyzer Improvements",
    "timestamp": "February 4, 2026",
    "image": fig4,
    "type": 2,
    "is_release_notes": true,
    "alt": "illustration showing a laptop updating",
    "verbiage": "The Cohort Analyzer now includes Kaplan–Meier survival plots with risk tables, allowing users to compare survival outcomes across cohorts based on genomic features, treatments, or disease subtypes. Risk tables display the number of participants under observation at each time point, making survival trends easier to interpret."
  }
 ];

