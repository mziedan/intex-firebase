import Slider from "../components/Slider.js";

const fetchPartners = async () => { const response = await fetch("http://localhost:3000/partners"); const data = await response.json(); return data; };

const HomePage = async () => {
  const categories = await fetchCategories();
  const courses = await fetchCourses();
  const categoriesHtml = categories
    .map(
      (category) => `
    <a href="#/courses/category/${category.id}">
      <div>
          ${category.name}
      </div>
    </a>
  `
    )
    .join("");

  const coursesHtml = courses
    .map(
      (course) => `
    <a href="#/course-detail/${course.id}" >
      <div>
          ${course.name}
      </div>
    </a>
  `
    )
    .join("");

    const partners = await fetchPartners();

    const partnersHtml = partners
    .map(
        (partner) => `
        <a href="${partner.link}" target="_blank">
            <img src="${partner.image}" alt="${partner.name}">
        </a>
    `
    )
    .join("")


    .join("");

  return `
  <style>
  .partners-container {
    overflow: hidden; /* Hide overflowing content */
    white-space: nowrap; /* Prevent text wrapping */
    width: 100%;
  }
  .partners-slider {
    animation: slidePartners 20s linear infinite; /* Animate the slider */
  }
  </style>
  ${Slider()}
  <section class="about"> 
    <h2>About the Company</h2>
    <p>
      We are a leading offline training company with years of experience in
      delivering high-quality training courses.
    </p>
  </section>
  <section class="logo-slider">
  <h2>Our Partners</h2>
    <div class="partners-container">
        <div class="partners-slider">
            ${partnersHtml}
        </div>
      </div>
    </div>
  </section>
  <section class="course-categories">
    <h2>Course Categories</h2>
    <div class="categories">
    ${categoriesHtml}
    </div>
  </section>
  <section class="matrix">
    <h2>Matrix Section</h2>
      <div class="courses">
        ${coursesHtml}
      </div>
  </section>
  <section class="stats">
    <h2>Company Stats</h2>
    <div class="stats-grid">
      <div>Years of Experience: 10</div>
      <div>Participants: 5000+</div>
      <div>Clients: 100+</div>
      <div>Associates: 50+</div>
      <div>Countries Served: 5</div>
      <div>Total Courses: 200+</div>
    </div>
  </section>
  <style>
  @keyframes slidePartners {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); } /* Slide to the left */
  }
  </style>
`;
};

async function fetchCategories() {
  const response = await fetch("http://localhost:3000/categories");
  const data = await response.json();
  return data;
}

async function fetchCourses() {
  const response = await fetch("http://localhost:3000/courses");
  const data = await response.json();
  return data;
}

export default HomePage;