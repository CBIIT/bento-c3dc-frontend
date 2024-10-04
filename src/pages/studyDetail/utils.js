/*export const openDoubleLink = async (url, setError) => {
    try {
        window.open(url, '_self')
    }
    catch (e) {
        setError("Failed to fetch the download URL. Please try again");
    }
};
*/

export async function openDoubleLink(url, setError) {
    try {
      let urlContent = await fetch(url);
      if (urlContent.ok) {
        let finalContent = await urlContent.json();
        if (typeof finalContent == "object") {
          if (finalContent.url) {
            window.location.href = finalContent.url
          } else {
            setError("The server response does not contain a valid download link");
          }
        } else {
          setError("Received an invalid response from the server. Please try again later")
        }
      } else {
        setError("Network error. Please check your internet connection and try again");
      }
    } catch (e) {
      setError("Failed to fetch the download URL. Please try again");
    }
  }