import $ from 'jquery';

import { renderImages } from './renderImages';

export async function loadSlider() {
  const slider = $('#imageSlider');
  const innerSliders = slider.find('.carousel-inner');

  await renderImages(innerSliders, innerSliders.find('.carousel-item'));
  innerSliders.find('.carousel-item').first().addClass('active');

  const sliderModal = $('#sliderModal');
  $('#imgs img').on('click', (e) => {
    const imgUrl = $(e.target).attr('src');
    slider.carousel(slider.find(`[src="${imgUrl}"]`).parent().index());

    sliderModal.modal('show');
  });

  return slider;
}
export default loadSlider;
