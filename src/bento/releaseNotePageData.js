
import env from "../utils/env";

const releaseNoteJsonUrl = env.REACT_APP_DATA_RELEASES_URL

export const fetchReleaseNoteContent = async () => {
   return fetch(releaseNoteJsonUrl, {
      method: 'GET'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        
        return groupContent(data,[]);
      })
      .catch((error) => {
        console.error("Error fetching release notes:", error);
      });
  };

const getYearFromDate = (date) => {
    return new Date(date).getFullYear().toString();
  };
  
  const groupContent = (versionData,releaseNotePageData) => {
  versionData.VERSIONS.forEach((version) => {
    const releaseYear = getYearFromDate(version.releaseDate);
  
    let yearGroup = releaseNotePageData.find(data => data.Year === releaseYear);
  
    if (!yearGroup) {
      yearGroup = {
        Year: releaseYear,
        is_open: false,
        versions: []
      };
      releaseNotePageData.push(yearGroup);
    }
  
    yearGroup.versions.push(version);
  });
  return releaseNotePageData;
}
