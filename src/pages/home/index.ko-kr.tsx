import React from 'react';
import Home from '@components/Home/Home';
import { graphql, Link } from 'gatsby';

export default function ({ data }: { data: any }) {
  return (
    <>
      <Home data={data} />
      <hr />
      <Link to="/ko-kr/home">한국어</Link>
      <br />
      <Link to="/en-us/home">영어</Link>
    </>
  );
}
export const query = graphql`
  query($langKey: String) {
    allPrismicToyHomepageMain(filter: { lang: { eq: $langKey } }) {
      edges {
        node {
          data {
            main_title {
              text
              type
            }
            main_title_image {
              alt
              url
              dimensions {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
