import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../data/mockData';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="group"
    >
      <div className="card hover:shadow-md overflow-hidden h-full flex flex-col transition-all duration-300">
        <div className="h-32 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;