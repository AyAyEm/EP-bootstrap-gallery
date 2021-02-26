import $ from 'jquery';

export async function loadIncludes(parent: HTMLElement | string = 'body') {
  const operations = $(parent as string).find('[include-html]').map(async (_i, element) => {
    const jElement = $(element);
    const url = jElement.attr('include-html');
    jElement.removeAttr('include-html');

    return $.get(url).then((html) => jElement.html(html))
  }).toArray();

  return Promise.all(operations);
}
