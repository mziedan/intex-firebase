const Slider = () => {
  const fetchSliderData = async () => {
    try {
      const response = await fetch('/slider');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const sliderData = await response.json();
      return sliderData;
    } catch (error) {
      console.error('Error fetching slider data:', error);
      return [];
    }
  };

  const sliderHTML = fetchSliderData().then((sliderData) => {
    let html = `<div class="slider-container" style="overflow: hidden;">
                  <div class="slides-container" style="display: flex; transition: transform 0.5s ease-in-out;">`;
  
    sliderData.forEach((item) => {
      html += `<div class="slide" style="min-width: 100%; width: 100%; height: auto; display:flex; flex-direction: column; align-items:center;">
                 <img src="${item.image}" alt="Slider Image" style="width: 100%; height: auto;">
                 ${item.quote ? `<div class="slider-quote" style="text-align: center; background-color: rgba(0,0,0,0.5); color: white; padding: 10px; margin: 0 auto;">${item.quote}</div>` : ''}
               </div>`;
    });
  
    html += `</div></div>`;
  
    // Set the interval once the DOM is ready
    setTimeout(() => {
      const slidesContainer = document.querySelector('.slides-container');
      const slides = document.querySelectorAll('.slide');
      let slideIndex = 0;
      setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        const offset = -slideIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
      }, 5000);
    }, 0);

    setTimeout(() => {
      const slidesContainer = document.querySelector('.slides-container');
      const slides = document.querySelectorAll('.slide');
      let slideIndex = 0;
      setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        const offset = -slideIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
      }, 5000);
    },0);
    return html
  });
  return sliderHTML;
};
export default Slider;