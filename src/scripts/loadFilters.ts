import { loadFileNames, extractFileName } from './loadFileNames';

export const removeNumbers = (str: string) => str.replace(/\d+/g, '');

export async function loadFilters() {
  const imgUrls = await loadFileNames('./imgs');
  const imgNames = imgUrls.map((imgUrl) => extractFileName(imgUrl, ''));
  const uniqueImgNames = Array.from(new Set(imgNames.map(removeNumbers)));

  const filterModel = $('#navbarFilters div.checkboxFilter');
  const filtersGroup = filterModel.parent();

  const filters = uniqueImgNames.map((imgName) => filterModel.clone().find('span').html(imgName).parent());
  filters.forEach((filter) => filtersGroup.append(filter));
  filterModel.remove();

  
  const activeFilters = new Set();
  const thumbCards = $('#imgs div.images-subcontainer');
  function updateThumbs() {
    if (activeFilters.size === 0) {
      thumbCards.show();
      return;
    }

    thumbCards.each((_i, card) => {
      const jCard = $(card);
      const src = jCard.find('img').attr('src') ?? '';
      const fileName = extractFileName(src, '');

      if (!activeFilters.has(removeNumbers(fileName))) {
        jCard.hide();
      } else {
        jCard.show();
      }
    });
  }

  filtersGroup.find('input').on('input', (e) => {
    const filterName = $(e.target).siblings('span').html();
    if (activeFilters.has(filterName)) {
      activeFilters.delete(filterName);
    } else {
      activeFilters.add(filterName);
    }

    updateThumbs();
  });
}
export default loadFilters;