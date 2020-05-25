export default function paginate(items, currentPage, noPerPage) {
  if (items && Array.isArray(items)) {
    const begin = ((currentPage - 1) * noPerPage);
    const end = begin + noPerPage;
    return items.slice(begin, end);
  }
  return null;
}
