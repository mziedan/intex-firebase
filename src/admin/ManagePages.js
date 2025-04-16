const ManagePages = () => {
    const fetchPages = async () => {
        const response = await fetch('/pages');
        const pages = await response.json();
        return pages;
    };

    const createPage = async (title, image, content) => {
        const response = await fetch('/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                image: image ? 'image-file-name' : null, // Simulate image upload
            }),
        });
        const newPage = await response.json();
        return newPage;
    };

    const updatePage = async (id, title, image, content) => {
        const response = await fetch(`/pages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                image: image ? 'image-file-name' : null, // Simulate image upload
        });
        const updatedPage = await response.json();
        return updatedPage;
    };

    const deletePage = async (id) => {
        await fetch(`/pages/${id}`, {
            method: 'DELETE',
        });
    };

    const renderPageList = async () => {
        const pages = await fetchPages();
        const pagesList = document.getElementById('pages-list');
        pagesList.innerHTML = '';
        pages.forEach((page) => {
            const pageItem = document.createElement('li');
            pageItem.innerHTML = `
        <span>${page.title}</span>
        <button class="edit-button" data-page-id="${page.id}">Edit</button>
        <button class="delete-button" data-page-id="${page.id}">Delete</button>
      `;
            pagesList.appendChild(pageItem);
        });

        // Attach event listeners to edit and delete buttons
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                const pageId = event.target.dataset.pageId;
                const page = pages.find((p) => p.id == pageId);
                // Update form with existing values
                document.getElementById('page-id').value = page.id;
                document.getElementById('page-title').value = page.title;
                document.getElementById('page-content').value = page.content;
                document.getElementById('new-page-form').style.display = 'block';
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                const pageId = event.target.dataset.pageId;
                await deletePage(pageId);
                renderPageList();
            });
        });
    };

    setTimeout(renderPageList, 0);

    return `
        <section class="manage-pages">
            <h2>Manage Custom Pages</h2>
            <button id="create-page-button">Create New Page</button>
            <div id="new-page-form" style="display: none;">
                <h3>Create New Page</h3>
                <input type="hidden" id="page-id" value="" />
                <input type="text" placeholder="Page Title" id="page-title" />
                <input type="file" id="page-image" accept="image/*" />
                <textarea id="page-content" placeholder="Page Content (Use HTML tags to format the text)"></textarea>
                <button id="submit-new-page">Submit</button>
            </div>
            <h3>Pages</h3>
            <ul id="pages-list"></ul>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const createPageButton = document.getElementById('create-page-button');
                    const newPageForm = document.getElementById('new-page-form');
                    createPageButton.addEventListener('click', function() {
                        document.getElementById('page-id').value = '';
                        document.getElementById('page-title').value = '';
                        document.getElementById('page-content').value = '';
                        newPageForm.style.display = newPageForm.style.display === 'none' ? 'block' : 'none';
                    });
                    const submitButton = document.getElementById('submit-new-page');
                    submitButton.addEventListener('click', async function() {
                        const pageId = document.getElementById('page-id').value;
                        const pageTitle = document.getElementById('page-title').value;
                        const pageImage = document.getElementById('page-image').files[0];
                        const pageContent = document.getElementById('page-content').value;
                        if(pageImage){
                            console.log('Simulating file upload:', pageImage);
                        }
                        if(pageId){
                           await updatePage(pageId, pageTitle, pageImage, pageContent);
                        } else {
                           console.log('Simulating file upload:', pageImage);

                            await createPage(pageTitle, pageImage, pageContent);
                        }
                        renderPageList();
                        newPageForm.style.display = 'none';
                    });
                });
            </script>
        </section>
    `;
};

export default ManagePages;