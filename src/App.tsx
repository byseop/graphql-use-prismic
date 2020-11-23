import React, { useState, useMemo } from 'react';
import { gql } from 'apollo-boost';
import usePrismic from './hooks/usePrismic';

function App() {
  const [lang, setLang] = useState('ko-kr');
  const query = useMemo(() => {
    return gql`
      {
        allToyprojectHomepages(lang: "${lang}") {
          edges {
            node {
              sectionMainTitle
              sectionMainDescription
              sectionImage
            }
          }
        }
      }
    `;
  }, [lang]);
  console.log('rendered');
  const { loading, error, data } = usePrismic(query);
  console.log(loading, data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!!!</div>;
  if (data) {
    return (
      <div className="App">
        <div>
          <button onClick={() => setLang('ko-kr')}>한국어</button>
          <button onClick={() => setLang('en-us')}>영어</button>
        </div>
        <h2>
          {data.allToyprojectHomepages.edges[0].node.sectionMainTitle[0].text}
        </h2>
        <p>
          {
            data.allToyprojectHomepages.edges[0].node.sectionMainDescription[0]
              .text
          }
        </p>
        <img
          src={data.allToyprojectHomepages.edges[0].node.sectionImage.url}
          alt={data.allToyprojectHomepages.edges[0].node.sectionImage.alt}
        />
      </div>
    );
  }
  return null;
}

export default App;
