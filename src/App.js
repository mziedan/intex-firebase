import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './pages/HomePage.js';
import CoursesPage from './pages/CoursesPage.js';
import CourseDetailPage from './pages/CourseDetailPage.js';
import ContactUsPage from './pages/ContactUsPage.js';
import AdminDashboard from './admin/AdminDashboard.js';
import ManageCategories from './admin/ManageCategories.js';
import ManageCourses from './admin/ManageCourses.js';
import ManageSessions from './admin/ManageSessions.js';
import ManageRegistrations from './admin/ManageRegistrations.js';
import ManageSlider from './admin/ManageSlider.js';
import ManagePartners from './admin/ManagePartners.js';
import AdminLogin from './admin/AdminLogin.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import TermsConditions from './pages/TermsConditions.js';
import ManagePages from './admin/ManagePages.js';
import ManageUsers from './admin/ManageUsers.js';

const App = () => {
  const path = window.location.hash.substring(1);
  let content;
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  switch (path) {
    case '/':
    case '':
      content = HomePage();
      break;
    case '/courses':
      content = CoursesPage();
      break;
    case '/course-detail':
      content = CourseDetailPage();
      break;
    case '/contact-us':
      content = ContactUsPage();
      break;
      case '/admin-login':
      content = AdminLogin();
      break;
      case '/privacy-policy':
        content = PrivacyPolicy();
        break;
      case '/terms-conditions':
        content = TermsConditions();
        break;
      case '/admin':        
        if (!isLoggedIn) {window.location.hash = '#/admin-login';}
      content = AdminDashboard();
      break;
    case '/admin/manage-categories': content = ManageCategories(); break;
    case '/admin/manage-courses': content = ManageCourses(); break;
    case '/admin/manage-sessions': content = ManageSessions(); break;
    case '/admin/manage-registrations': content = ManageRegistrations(); break;
    case '/admin/manage-slider': content = ManageSlider(); break;
    case '/admin/manage-partners': content = ManagePartners(); break;
    case '/admin/manage-pages': content = ManagePages(); break;
    case '/admin/manage-users': content = ManageUsers(); break;
    default: content = HomePage();
  }

  return `    <header id='header'>${Header()}</header>    <main id='main'>${content}</main>    <footer id='footer'>${Footer()}</footer>  `;
};

export default App;