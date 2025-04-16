// src/admin/ManageCourses.js
const ManageCourses = async () => {
  let courses = [];
  try {
    const response = await fetch('/courses');
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    courses = await response.json();
  } catch (err) {
    console.error('Error fetching courses:', err);
    return `<section class="manage-courses"><h2>Manage Courses</h2><p>Error fetching courses.</p></section>`;
  }

  const renderCourses = () => {
    return courses.map((course) => `
      <li data-course-id="${course.id}">
        ${course.name}
        <button class="edit-course" data-course-id="${course.id}">Edit</button>
        <button class="delete-course" data-course-id="${course.id}">Delete</button>
      </li>
    `).join('');
  };

  const handleCourseActions = () => {
    document.querySelectorAll('.delete-course').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const courseId = event.target.dataset.courseId;
        try {
          const response = await fetch(`/courses/${courseId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
          // Remove the course from the UI
          document.querySelector(`li[data-course-id="${courseId}"]`).remove();
        } catch (err) {
          console.error('Error deleting course:', err);
          alert('Error deleting course');
        }
      });
    });

    document.querySelectorAll('.edit-course').forEach((button) => {
      button.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        const course = courses.find(c => c.id === parseInt(courseId));

        const editForm = document.createElement('div');
        editForm.innerHTML = `
          <h3>Edit Course</h3>
          <input type="text" id="edit-course-name-${courseId}" value="${course.name}" placeholder="Course Name">
          <input type="file" id="edit-course-image-${courseId}" accept="image/*">
          <textarea id="edit-course-description-${courseId}" placeholder="Course Description (Use HTML tags to format)">${course.description}</textarea>
          <button id="save-edit-${courseId}">Save</button>
          <button id="cancel-edit-${courseId}">Cancel</button>
        `;
        document.querySelector(`li[data-course-id="${courseId}"]`).appendChild(editForm);

        document.getElementById(`save-edit-${courseId}`).addEventListener('click', async () => {
          const name = document.getElementById(`edit-course-name-${courseId}`).value;
          const description = document.getElementById(`edit-course-description-${courseId}`).value;
          const imageInput = document.getElementById(`edit-course-image-${courseId}`);
          const imageFile = imageInput.files[0];
          let imageName = course.image;
          if (imageFile) {
            console.log('Simulating image upload:', imageFile);
            imageName = imageFile.name;
          }
          try {
            const response = await fetch(`/courses/${courseId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, description, image: imageName })
            });
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            const updatedCourse = await response.json();
            document.querySelector(`li[data-course-id="${courseId}"]`).firstChild.textContent = updatedCourse.name;
          } catch (err) {
            console.error('Error editing course:', err);
            alert('Error editing course');
          } finally {
            editForm.remove();
          }
        });
        document.getElementById(`cancel-edit-${courseId}`).addEventListener('click', () => {
          editForm.remove();
        });
      });
    });
  };

  const handleCreateCourse = () => {
    const createForm = document.createElement('div');
    createForm.innerHTML = `
      <h3>Create Course</h3>
      <input type="text" id="create-course-name" placeholder="Course Name">
      <input type="file" id="create-course-image" accept="image/*">
      <textarea id="create-course-description" placeholder="Course Description (Use HTML tags to format)"></textarea>
      <button id="save-create">Save</button>
    `;
    document.querySelector('.manage-courses').appendChild(createForm);
    document.getElementById('save-create').addEventListener('click', async () => {
        const name = document.getElementById('create-course-name').value;
        const imageInput = document.getElementById('create-course-image');
        const imageFile = imageInput.files[0];
        const description = document.getElementById('create-course-description').value;
        let imageName = null;
        if (imageFile) {
          console.log('Simulating image upload:', imageFile);
          imageName = imageFile.name;
        }
        try {
          const response = await fetch('/courses', {
            method: 'POST',
              headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
          });
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
          const newCourse = await response.json();
            newCourse.image = imageName;
          courses.push(newCourse);
          document.querySelector('.courses-list').innerHTML += `
              <li data-course-id="${newCourse.id}">
                  ${newCourse.name}
                  <button class="edit-course" data-course-id="${newCourse.id}">Edit</button>
                  <button class="delete-course" data-course-id="${newCourse.id}">Delete</button>
              </li>`;
        } catch (err) {
          console.error('Error creating course:', err);
          alert('Error creating course');
        }
    });
  };

  const html = `
    <section class="manage-courses">
      <h2>Manage Courses</h2>
      <button id="create-course">Create Course</button>
      <ul class="courses-list">${renderCourses()}</ul>
    </section>
  `;

  setTimeout(() => {
      handleCourseActions();
      document.getElementById('create-course').addEventListener('click', handleCreateCourse);
  }, 0);

  return html;
};
export default ManageCourses;