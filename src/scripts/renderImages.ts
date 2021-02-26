import { loadFileNames, extractFileName } from './loadFileNames';

export async function renderImages(container: JQuery, subContainer?: JQuery) {
  const imgUrls = await loadFileNames('./imgs');
  const imgModel = container.find('img');
  imgModel.remove();

  imgUrls.forEach((imgUrl) => {
    const alt = imgUrl.match(/\/(\w*)\./)?.[1];

    const imgElement = imgModel.clone().attr({ src: imgUrl, alt });
    const subcontainerElement = subContainer?.clone();
    if (subcontainerElement && subcontainerElement.has('span')) {
      const fileName = extractFileName(imgUrl ?? '');
      if (fileName) subcontainerElement.find('span').html(fileName);
    }

    if (subcontainerElement) {
      subcontainerElement.prepend(imgElement).appendTo(container);
    } else {
      imgElement.appendTo(container);
    }
  });
  if (subContainer) subContainer.remove();

  return container;
}
export default renderImages;
