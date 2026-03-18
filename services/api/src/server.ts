import http from 'node:http';

import { getCountry, getCountryCourses, listCountries } from './routes/countries.ts';
import { getCourse } from './routes/courses.ts';
import { getPlace } from './routes/places.ts';
import { searchCatalog } from './routes/search.ts';
import { getYoutuber, listYoutubers } from './routes/youtubers.ts';

function sendJson(response: http.ServerResponse, statusCode: number, body: unknown) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function notFound(response: http.ServerResponse) {
  sendJson(response, 404, { message: 'Not found' });
}

export function createAppServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const pathname = url.pathname;

    if (request.method !== 'GET') {
      sendJson(response, 405, { message: 'Method not allowed' });
      return;
    }

    if (pathname === '/countries') {
      sendJson(response, 200, { countries: listCountries() });
      return;
    }

    if (pathname === '/youtubers') {
      sendJson(response, 200, { youtubers: listYoutubers() });
      return;
    }

    if (pathname === '/search') {
      const query = url.searchParams.get('q') ?? '';
      sendJson(response, 200, { results: searchCatalog(query) });
      return;
    }

    const countryCoursesMatch = pathname.match(/^\/countries\/([^/]+)\/cities\/([^/]+)\/courses$/);
    if (countryCoursesMatch != null) {
      const result = getCountryCourses(countryCoursesMatch[1], countryCoursesMatch[2]);
      if (result == null) {
        notFound(response);
        return;
      }

      sendJson(response, 200, { courses: result });
      return;
    }

    const countryMatch = pathname.match(/^\/countries\/([^/]+)$/);
    if (countryMatch != null) {
      const result = getCountry(countryMatch[1]);
      if (result == null) {
        notFound(response);
        return;
      }

      sendJson(response, 200, { country: result });
      return;
    }

    const youtuberMatch = pathname.match(/^\/youtubers\/([^/]+)$/);
    if (youtuberMatch != null) {
      const result = getYoutuber(youtuberMatch[1]);
      if (result == null) {
        notFound(response);
        return;
      }

      sendJson(response, 200, { youtuber: result });
      return;
    }

    const courseMatch = pathname.match(/^\/courses\/([^/]+)$/);
    if (courseMatch != null) {
      const result = getCourse(courseMatch[1]);
      if (result == null) {
        notFound(response);
        return;
      }

      sendJson(response, 200, { course: result });
      return;
    }

    const placeMatch = pathname.match(/^\/places\/([^/]+)$/);
    if (placeMatch != null) {
      const result = getPlace(placeMatch[1]);
      if (result == null) {
        notFound(response);
        return;
      }

      sendJson(response, 200, { place: result });
      return;
    }

    notFound(response);
  });
}
