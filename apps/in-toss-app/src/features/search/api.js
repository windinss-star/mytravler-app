import { searchCatalog } from '../../../../../services/api/src/routes/search.ts';

export function searchEntities(query) {
  return searchCatalog(query);
}
