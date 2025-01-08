
import fig1 from "../assets/announcement/fig1.svg";
import fig2 from "../assets/announcement/fig2.svg";
import fig3 from "../assets/announcement/fig3.svg";
import fig4 from "../assets/announcement/fig4.svg";
import fig6 from "../assets/announcement/fig6.svg";
import fig7 from "../assets/announcement/fig7.svg";


export const announcementPageData = [
    {
        "title": "Datasets Update",
        "timestamp": "November 7, 2024",
        "image": fig6,
        "type": 1,
        "is_release_notes": true,
        "alt": "An animated laptop surrounded by animated objects, including a server, gears, and a magnifying glass.",
        "verbiage": "This release includes three new harmonized data sets (phs003432, phs003519, and phs000466) and updates to existing data sets (phs002517, and phs002790) on the C3DC Explore page. All the data have been aligned to the most recent version of the data model. For more detailed information about these changes and to review the full list of updates, please refer to our data release update."
    },
    {
        "title": "Data Model Update",
        "timestamp": "Novemebr 7, 2024",
        "image": fig7,
        "type": 1,
        "alt": "A web-like design connecting various icons, including people icons and profile icons.",
        "verbiage": "In this release, we are introducing enhancements to our data model. Specifically, we have added two new nodes: treatment and treatment response. These additions will allow for more detailed tracking and analysis of treatment regimens and their outcomes, providing valuable insights for researchers and clinicians."
    },
    {
        "title": "Resource Update",
        "timestamp": "November 7, 2024",
        "image": fig1,
        "type": 2,
        "alt": "Megaphone",
        "verbiage": "We are excited to announce that Release 4 of the C3DC application is now available! This release introduces three new datasets (phs003432, phs003519, and phs000466), adds new facets to the Explore page (including treatment and treatment response nodes), and introduces new sections under the About page, such as an Announcements page and Release Notes. These updates are designed to enhance the user experience and provide more comprehensive data updates. Please visit the <a href='/release_notes_pdf' target='_blank'>Release Note</a> to see all the details in the release note."
    },

    {
        "title": "Home Page",
        "timestamp": "November 7, 2024",
        "image": fig4,
        "type": 2,
        "alt": "A laptop screen displaying a progress bar with the text 'Updating' shown on the screen.",
        "verbiage": "We have enhanced the homepage by introducing a quick link to the announcement page, making it easier for users to access important updates regarding data releases and application changes. This improvement navigation, allowing users to stay informed about the latest developments. In addition, we've added a new feature that allows users to view the version history of our data updates, providing increased transparency and helping users track data updates more effectively."
    },
    {
        "title": "Explore Page",
        "timestamp": "November 7, 2024",
        "image": fig3,
        "type": 2,
        "alt": "A top-down view of a laptop, with a person typing on the keyboard",
        "verbiage": "In this release, we have enhanced the facet search by reorganizing it to improve usability and streamline the search process. A key update is the replacement of the Ethnicity widget with a newly introduced Treatment widget. This new widget allows users to filter data more effectively by offering advanced treatment-related options, enabling them to explore and analyze treatment-specific data with greater precision and generate more targeted insights."
    },
    {
        "title": "Cohort Selector",
        "timestamp": "November 7, 2024",
        "image": fig2,
        "type": 2,
        "alt": "A woman wearing glasses sitting in front of a computer",
        "verbiage": "This new feature in the explore page provides users with the ability to select up to 10 cohort groups (participants) and generate clinical and manifest files in CSV or JSON format, which can then be utilized on other platforms for further analysis. Users are able to customize each cohort by assigning a name and description, and they can view, add, or remove participants from individual cohorts. Additionally, users have the option to delete an entire cohort if necessary. The application also offers a view of all selected cohorts."
    }
];
