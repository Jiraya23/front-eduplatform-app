import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
          {item.href ? (
            <Link href={item.href} className="text-green-600 hover:text-green-700 font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
