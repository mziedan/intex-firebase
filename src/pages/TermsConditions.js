import { useEffect, useState } from 'react';

const TermsConditions = () => { 
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/pages/terms');
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };

    fetchPageData();
  }, []);

  return (
    <section className="terms-conditions">
      {pageData && <div dangerouslySetInnerHTML={{ __html: pageData.content }} />}
    </section>
  );
};

export default TermsConditions;