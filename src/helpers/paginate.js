// takes in an array of items, ints representing currentPage, no of items per page
// returns an array of items belonging to current page
// returns [] for invalid params

export default function paginate(items, currentPage, noPerPage) {
  if (items
    && Array.isArray(items)
    && Number.isInteger(currentPage)
    && Number.isInteger(noPerPage)
    && currentPage > 0
    && noPerPage > 0
  ) {
    const begin = ((currentPage - 1) * noPerPage);
    const end = begin + noPerPage;
    return items.slice(begin, end);
  }
  return [];
}
