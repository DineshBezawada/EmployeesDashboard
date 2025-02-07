export function showingData(currentPage, pageDataLimit, totalRecords) {
  const start = (currentPage - 1) * pageDataLimit + 1;
  let end;
  if (currentPage * pageDataLimit > totalRecords) {
    end = totalRecords;
  } else {
    end = currentPage * pageDataLimit;
  }
  return `Showing ${start} to ${end} of ${totalRecords}`;
}
