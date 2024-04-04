import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ProductsView } from '../_sections/products/view';

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
