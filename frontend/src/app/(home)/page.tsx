import { Container, Package } from 'lucide-react';
import SummaryCard from '@/components/custom/SummaryCard';
import { getAllProducts } from '@/api/products.api';
import { getAllCategories } from '@/api/categories.api';

export default async function Home() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <SummaryCard
        title="Total Categories"
        description=""
        icon={<Container />}
        value={categories.totalCount}
      />
      <SummaryCard
        title="Total Products"
        description=""
        icon={<Package />}
        value={products.totalCount}
      />
    </div>
  );
}
