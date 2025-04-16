const Header = () => {
  let suggestionTimeout;
  
  const isAdmin = true;

  const handleSearch = () => {
    const searchTerm = document.querySelector('.search-bar input').value;
    if (searchTerm.trim() !== '') {
      window.location.hash = `/courses?search=${encodeURIComponent(searchTerm)}`;
    }
  };

    const fetchMainCategories = async () => {
        const response = await fetch('/categories');
        const categories = await response.json();
        return categories.filter(cat => cat.parent_category_id === null);
    };

    const fetchSubcategories = async (categoryId) => {
        const response = await fetch('/categories');
        const categories = await response.json();
        return categories.filter(cat => cat.parent_category_id === categoryId);
    };

    const renderCategories = async () => {
      const mainCategories = await fetchMainCategories();
      let categoriesHTML = '';
      for (const category of mainCategories) {
          const subcategories = await fetchSubcategories(category.id);
          let subcategoriesHTML = '';
          if (subcategories.length > 0) {
              subcategoriesHTML = '<ul class="subcategories">';
              for (const subcategory of subcategories) {
                  subcategoriesHTML += `<li><a href="#/courses?category=${subcategory.id}">${subcategory.name}</a></li>`;
              }
              subcategoriesHTML += '</ul>';
          }
          categoriesHTML += `<li class="category-item">
                                 <a href="#/courses?category=${category.id}">${category.name}</a>
                                 ${subcategoriesHTML}
                             </li>`;
      }
      return categoriesHTML;
  };

    const fetchCourseSuggestions = async (searchTerm) => {
      const response = await fetch(`/courses/search?term=${searchTerm}`);
      const data = await response.json();
      return data.map(course => course.name);
    };
  
    const displaySuggestions = async (searchTerm) => {
      const suggestions = await fetchCourseSuggestions(searchTerm);
      const suggestionsContainer = document.getElementById('suggestionsContainer');
      suggestionsContainer.innerHTML = '';
  
      if (suggestions.length > 0) {
        const list = document.createElement('ul');
        suggestions.forEach(suggestion => {
          const item = document.createElement('li');
          item.textContent = suggestion;
          item.addEventListener('click', () => {
            document.getElementById('searchInput').value = suggestion;
            suggestionsContainer.innerHTML = '';
          });
          list.appendChild(item);
        });
        suggestionsContainer.appendChild(list);
      }
    };
    
    const handleInputChange = (event) => {
      clearTimeout(suggestionTimeout);
      suggestionTimeout = setTimeout(() => displaySuggestions(event.target.value), 300);
    };
    const headerHTML = async () => `
        <header>
            <div class='logo'>
                <h1>Offline Training</h1>
            </div>
            <nav>
                <ul>
                    <li><a href='#/'>Home</a></li>
                    <li class="category-menu">
                        <a href='#/courses'>Courses</a>
                        <ul class="categories-list">${await renderCategories()}</ul>
                    </li>
                    <li><a href='#/contact-us'>Contact Us</a></li>
                    ${isAdmin ? `<li><a href='#/admin'>Admin</a></li>` : ''}
                    <li><a href='#/login'>Login/Register</a></li>
                </ul>
            </nav>
            <div class='contact-info'>
                <p>+1234567890</p>
                <p>+0987654321</p>
            </div>
            <div class='brochure'>
                <a href="/dummy.pdf" download><button>Download Brochure</button></a>
            </div>
            <div class='search-bar'>
                <input type='text' placeholder='Search Courses' id='searchInput' autocomplete="off">
                <button id='searchButton'>Search</button>
                <div id='suggestionsContainer' class="suggestions-container"></div>
            </div>
        </header>
    `;

  const header = await headerHTML();
  setTimeout(() => {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', handleSearch);
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', handleInputChange);
    }
  }, 0);
  return header;
};
export default Header;
