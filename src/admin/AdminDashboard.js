import AdminLogin from './AdminLogin.js';

const AdminDashboard = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    // Redirect to the login page (or another appropriate page)
    window.location.hash = '#/admin/login';
  };

  // Check if there's an active session (replace with actual session check logic)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    return AdminLogin();
  } else {
    const handleBrochureUpload = () => {
      // Handle brochure upload logic here
      console.log('Brochure upload logic');
    };
    return `
      <section class="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><a href='#/admin/manage-categories'>Manage Categories</a></li>
            <li><a href='#/admin/manage-courses'>Manage Courses</a></li>
            <li><a href='#/admin/manage-sessions'>Manage Sessions</a></li>
            <li><a href='#/admin/manage-registrations'>Manage Registrations</a></li>
            
            <li><a href='#/admin/manage-users'>Manage Users</a></li>
            <li><a href='#/admin/manage-partners'>Manage Partners</a></li>
            <li><a href='#/admin/manage-slider'>Manage Slider</a></li>
            <li><a href='#/admin/manage-pages'>Manage Pages</a></li>
          </ul>
        </nav>
        <div>
            <button id="uploadBrochureButton" onclick="${handleBrochureUpload}">Upload Brochure</button>
        </div>
        <div>
          <button id="logoutButton" onclick="${handleLogout}">Logout</button>
        </div>
      </section>
    `;
  }
};

export default AdminDashboard;