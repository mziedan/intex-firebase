const CourseDetailPage = async () => {  
  const courseId = window.location.hash.split("/")[2];
  let course;
  try {
    
    const response = await fetch(`/courses/${courseId}`); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    course = await response.json();
  } catch (error) {
    console.error("Error fetching course details:", error);
    return `<section class='course-detail'>
    <h2>Error</h2>
    <p>There was an error loading the course details.</p>
  </section>`;
  }
  if (!course) {
    return `<section class='course-detail'>
                <h2>Error</h2>
                <p>No course with this id was found.</p>
              </section>`;
  }
  let sessions;
  try {
    const response = await fetch(`/sessions/course/${courseId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    sessions = await response.json();
  } catch (error) {
    console.error("Error fetching course sessions:", error);
    return `<section class='course-detail'><h2>${course.name}</h2><p>${course.description}</p><div>Error loading course sessions.</div></section>`;
  }
  
  const sessionsByDate = sessions.reduce((acc, session) => {
      if (!acc[session.date]) {
          acc[session.date] = [];
      }
      acc[session.date].push(session);
      return acc;
  }, {});
  
  const sessionList = Object.entries(sessionsByDate).map(([date, sessionsOnDate]) => {
      const timeslots = sessionsOnDate.map(session => `<li>${session.timeslot} - ${session.location}</li>`).join('');
      return `
          <li>
              <p><strong>Date: ${date}</strong></p>
              <ul>${timeslots}</ul>
              <form class="registration-form" 
              data-session-id="${sessionsOnDate[0].id}" 
              data-date="${date}">
          <input type="text" name="user_name" placeholder="Your Name" required>
          <input type="email" name="user_email" placeholder="Your Email" required>
          <button type="submit">Register</button>
          </form>
          </li>
          `;
      
      
    </li>
  `).join('');
  return `<section class='course-detail'>
    <h2>${course.name}</h2>
    <div id='course-description'></div>
    <div>
        <h3>Sessions:</h3>
        <ul>
          ${sessionList}
        </ul>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('.registration-form');
        forms.forEach(form => {
          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const sessionId = form.dataset.sessionId;
            const userName = form.querySelector('[name="user_name"]').value;
              const userEmail = form.querySelector('[name="user_email"]').value;
              const date = form.dataset.date;
              
            try {
              const response = await fetch('/registrations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ course_id: ${courseId}, user_name: userName, user_email: userEmail, session_id: sessionId }),
              });
              if (response.ok) {
                alert('Registration successful!');
              } else {
                alert('Registration failed.');
              }
            } catch (error) {
              console.error('Error during registration:', error);
              alert('Registration failed.');
            }
          });
        });
        const descriptionDiv = document.getElementById('course-description');
        if(descriptionDiv)
          descriptionDiv.innerHTML = ${JSON.stringify(course.description)};
      });
    </script>
  </section>`;
};
export default CourseDetailPage;