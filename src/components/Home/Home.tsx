import React from 'react';

type MainpagePropTypes = {
  data: any;
};

export default function Home({ data }: MainpagePropTypes) {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
