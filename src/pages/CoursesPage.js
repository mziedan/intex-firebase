const CoursesPage = async () => {
  let view = 'card'; // Default view is card

  try {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);


    const categoryId = urlParams.get('categoryId')
    const searchTerm = urlParams.get('searchTerm')
    const categoriesResponse = await fetch('/categories');
    const categories = await categoriesResponse.json();

    let coursesResponse;
    if (searchTerm) {
      coursesResponse = await fetch(`/courses/search?searchTerm=${searchTerm}`);
    } else if (categoryId) {
      coursesResponse = await fetch(`/courses`);
    } else {
      coursesResponse = await fetch("/courses");
    }

    const courses = await coursesResponse.json();

    if (!Array.isArray(categories)) {
      throw new Error("Categories data is not an array");
    }

    if (!Array.isArray(courses)) {
      throw new Error("Courses data is not an array");
    }

    const categoriesHTML = categories
      .map((category) => `<div>${category.name}</div>`)
      .join("");
    let filteredCourses = courses;
    if (categoryId) {
      filteredCourses = courses.filter(
        (course) => course.category_id == categoryId
      );
    }

    const cardView = (courses) => {
      return courses
        .map(
          (course) =>
            `<div><a href="#/course-detail?courseId=${course.id}">${
              course.name
            }</a></div>`
        )
            .join('');
    };
    const tableView = (courses) => {
      const tableRows = courses.map(course => {
        // Dummy data for demonstration
        const sessions = [
          { start_date: '2024-07-15', end_date: '2024-07-20', location: 'Room A' },
          { start_date: '2024-08-01', end_date: '2024-08-05', location: 'Room B' },
        ];
        return fetch(`/sessions/course/${course.id}`)
          .then((response) => response.json())
          .then((sessions) => {
          const sessionRows = sessions.map((session) => `
            <tr>
              <td>${session.timeslot}</td>
              <td>${session.location}</td>
              <td><button>Register</button></td>
            </tr>
          `).join("");
            return `
          <tr>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.duration}</td>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody> 
                  ${sessionRows}
                </tbody>
              </table>
            </td>
          </tr>
        `;
      }).join('');
        })
        .catch((error) => console.error("Error:", error));
    }).join("")

      return `
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Duration (Days)</th>
              <th>Time Slots</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      `;
    };
   
    const coursesTitle = categoryId
      ? `<h2>Courses of the category</h2>`
      : `<h2>All Courses</h2>`;
  
    const coursesHTML =
      view === "card" ? cardView(filteredCourses) : await tableView(filteredCourses);
    return `
      <section class='courses-page'>
       <h2>Courses</h2>
       <div class='view-options'>
         <button id='card-view-btn'>Card View</button>
         <button id='table-view-btn'>Table View</button>
        </div>
        <div class='categories'>${categoriesHTML}</div>
        <div class='courses'>
          
          ${coursesTitle}${coursesHTML}
        </div>
      </section>
    `
  } catch (error) {
    console.error(
      'Error fetching or displaying categories/courses:',
      error,
    );
    return `<section class='courses-page'><h2>Courses</h2><p>Error loading categories/courses.</p></section>`;
  }
};

export default CoursesPage;