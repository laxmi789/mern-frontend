import { Suspense } from 'react';
import CategoryClient from './CategoryClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryClient />
    </Suspense>
  );
}
