import 'bootstrap';

import $ from 'jquery';

import './scss/index.scss';
import { loadIncludes, renderImages, loadSlider, loadFilters } from './scripts';

(async () => {
  await loadIncludes().catch(console.error);
  await renderImages($('#imgs'), $('#imgs > div.images-subcontainer'));
  loadSlider();
  loadFilters();
})().catch(console.error);
