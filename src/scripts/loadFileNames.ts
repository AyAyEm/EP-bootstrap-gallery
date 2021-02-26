import $ from 'jquery';

export const fileNameRegex = /\.?\/(\w*)\.?\w*$/;

export function extractFileName<DefaultTo = unknown>(
  fileUrl: string,
  defaultTo: DefaultTo,
): string | DefaultTo;
export function extractFileName(fileUrl: string,defaultTo?: undefined): string | null;
export function extractFileName(fileUrl: string, defaultTo?: unknown) {
  return fileUrl.match(fileNameRegex)?.[1] ?? defaultTo ?? null;
}

export async function loadFileNames(folderUrl: string) {
  const urlFolderName = folderUrl.match(fileNameRegex)?.[1] ?? '';
  const urlValidator = new RegExp(`.?/${urlFolderName}(/\\w+/?)+.\\w+`);

  const response: string = await $.get(folderUrl);
  const urlElements = $(response).find('[href]')
    .filter((_i, element) => urlValidator.test($(element).attr('href') ?? ''));

  return urlElements.map((_i, element) => $(element).attr('href')).toArray();
}
export default loadFileNames;
