// src/admin/ManageCategories.js
const ManageCategories = async () => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('/categories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  };

  const createCategory = async (name, description, parentCategoryId = null, image) => {
    try {
        console.log(image);
      const imageName = image ? 'uploaded-' + image : null;
      const response = await fetch('/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, parentCategoryId, image:imageName }),

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to create category:', error);
      return null;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Failed to delete category:', error);
      return false;
    }
  };

  const updateCategory = async (id, name, description, parentCategoryId = null) => {
    try {
      const response = await fetch(`/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, parentCategoryId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to update category:', error);
      return null;
    }
  };

  const categories = await fetchCategories();
  const categoryItems = categories
    .map(
      (category) => `
        <li>
          ${category.name} - ${category.description}
          <button class="delete-category" data-id="${category.id}">Delete</button>
          <button class="edit-category" data-id="${category.id}">Edit</button>
        </li>
        <ul>
        ${
            category.subcategories
            ? category.subcategories.map(subcategory => `
            <li>
            ${subcategory.name} - ${subcategory.description}
            <button class="delete-category" data-id="${subcategory.id}">Delete</button>
            <button class="edit-category" data-id="${subcategory.id}">Edit</button>
            </li>
          `).join('')
          : ''
          }
          </ul>
      `
    )
    .join('');

  const manageCategoriesSection = `
    <section class="manage-categories">
      <h2>Manage Categories</h2>
      <div class="add-category">
        <h3>Add New Category</h3>
        <input type="text" id="new-category-name" placeholder="Category Name" required>
        <input type="text" id="new-category-description" placeholder="Category Description" required>
        <input type="file" id="new-category-image" accept="image/*" required>
        <button id="add-category-button">Add Category</button>
      </div>
      <ul>
      </ul>
      <h3>Subcategories</h3>
      <div class="add-subcategory">
      <input type="text" id="new-subcategory-name" placeholder="Subcategory Name" required>
      <input type="text" id="new-subcategory-description" placeholder="Subcategory Description" required>
      <input type="file" id="new-subcategory-image" accept="image/*" required>
      <select id="new-subcategory-category-id" required></select>
      <button id="add-subcategory-button">Add Subcategory</button>
        ${categoryItems}
      </ul>
    </section>
  `;
  setTimeout(() => {
    const addCategoryButton = document.getElementById('add-category-button');
    if(addCategoryButton){
        addCategoryButton.addEventListener('click', async () => {
          const newCategoryName = document.getElementById('new-category-name').value;
          const newCategoryDescription = document.getElementById('new-category-description').value;
          const newCategoryImage = document.getElementById('new-category-image').files[0]?.name;
          await createCategory(newCategoryName, newCategoryDescription, null,newCategoryImage);
          
          document.getElementById('new-category-name').value = '';
          document.getElementById('new-category-description').value = '';
          document.getElementById('new-category-image').value = null;
        });

        const addSubcategoryButton = document.getElementById('add-subcategory-button');
        if (addSubcategoryButton){
          addSubcategoryButton.addEventListener('click', async() => {
          const newSubcategoryName = document.getElementById('new-subcategory-name').value;
          const newSubcategoryDescription = document.getElementById('new-subcategory-description').value;
          const newSubcategoryImage = document.getElementById('new-subcategory-image').files[0]?.name;
        });
    }
  }, 0);

  return manageCategoriesSection;
};

export default ManageCategories;
