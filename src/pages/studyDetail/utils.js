export async function openDoubleLink(url, setError, fileName) {
  try {
    let response = await fetch(url);

    if (response.ok) {
      const reader = response.body.getReader();
      let chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
      }

      let blob = new Blob(chunks, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      let blobUrl = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(blobUrl);
    }
    else {
      setError("Network error. Please check your internet connection and try again.");
    }
  }
  catch (e) {
    setError("Failed to fetch the file. Please try again later.");
  }
}