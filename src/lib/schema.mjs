import { sitePath } from './paths.mjs';
import { articles } from './content.mjs';
import { branch, office, operator, reservation } from './site.mjs';

const ref = (id) => ({ '@id': id });
const corporate = 'https://www.iberfurgo.com/';
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function pageGraph(site, origin, path, title, description, article) {
  const root = new URL(sitePath('/'), origin).href;
  const url = new URL(sitePath(path), origin).href;
  const home = path === '/';
  const website = root + '#website';
  const page = url + '#webpage';
  const service = root + '#service';
  const serviceType = 'Alquiler de furgonetas para mudanzas por cuenta propia';
  const graph = [
    { '@type': 'Organization', '@id': operator, name: 'Iberfurgo', url: corporate },
    { '@type': 'WebSite', '@id': website, name: site.name, url: root, publisher: ref(operator), inLanguage: 'es-ES' },
    {
      '@type': path === '/blog/' ? 'CollectionPage' : 'WebPage', '@id': page, url, name: title, description,
      isPartOf: ref(website), publisher: ref(operator), inLanguage: 'es-ES',
      mainEntity: ref(home ? service : article ? url + '#article' : url + '#guides'),
      ...(home ? { hasPart: ref(root + '#calculadora') } : { breadcrumb: ref(url + '#breadcrumb') }),
    },
  ];
  if (home) {
    graph.push(
      { '@type': 'WebApplication', '@id': root + '#calculadora', url: root + '#calculadora',
        name: site.toolTitle, description: 'Compara las medidas del bulto, la puerta y el interior y estima los viajes por peso y volumen.',
        inLanguage: 'es-ES', about: ref(service), isPartOf: ref(page), publisher: ref(operator) },
      { '@type': 'AutoRental', '@id': branch, name: 'Iberfurgo en Bilbao', url: reservation, parentOrganization: ref(operator),
        telephone: office.phone, hasMap: office.maps, address: { '@type': 'PostalAddress', streetAddress: 'Av. Txorierri, 46',
          postalCode: '48150', addressLocality: 'Sondika', addressRegion: 'Bizkaia', addressCountry: 'ES' },
        openingHoursSpecification: [['08:00', '13:00'], ['16:00', '19:00']].map(([opens, closes]) => ({
          '@type': 'OpeningHoursSpecification', dayOfWeek: weekdays, opens, closes })) },
      { '@type': 'Service', '@id': service, name: serviceType + ' en Bilbao', serviceType,
        provider: ref(branch), areaServed: { '@type': 'City', name: 'Bilbao' },
        audience: { '@type': 'Audience', audienceType: 'Particulares que organizan su mudanza' },
        mainEntityOfPage: ref(page), url: root },
    );
  } else {
    const crumbs = [{ name: 'Inicio', url: root }, { name: site.blogTitle, url: root + 'blog/' }];
    if (article) crumbs.push({ name: article.title, url });
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url })) });
    if (article) {
      graph.push({ '@type': 'BlogPosting', '@id': url + '#article', url, headline: article.title, description,
        author: ref(operator), publisher: ref(operator), mainEntityOfPage: ref(page), isPartOf: ref(root + 'blog/#webpage'), inLanguage: 'es-ES' });
    } else {
      graph.push({ '@type': 'ItemList', '@id': url + '#guides', name: site.blogTitle,
        itemListElement: articles.map((entry, index) => ({ '@type': 'ListItem', name: entry.title,
          position: index + 1, url: root + 'blog/' + entry.slug + '/' })) });
    }
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
