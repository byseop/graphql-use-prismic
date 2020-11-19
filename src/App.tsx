import React from 'react';
import { gql } from 'apollo-boost';
import usePrismic from './hooks/usePrismic';

const QUERY = gql`
  {
    allToyprojectHomepages {
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

function App() {
  console.log('rendered');
  const { loading, error, data } = usePrismic(QUERY);
  console.log(loading, data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!!!</div>;
  if (data) {
    return (
      <div className="App">
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
