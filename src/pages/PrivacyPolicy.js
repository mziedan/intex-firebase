import { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch('/pages/Privacy Policy');
        if (!response.ok) {
          throw new Error('Failed to fetch privacy policy');
        }
        const data = await response.json();
        setPage(data);
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
        setPage({content: '<p>Error fetching privacy policy</p>'});
      }
    };

    fetchPage();
  }, []);

  return ` <section class="privacy-policy">
  ${
    page
      ? `<h2>${page.title}</h2><div class='formatted-text'>${page.content}</div>`
      : "Loading..."
  }
  </section>`;
};

export default PrivacyPolicy;