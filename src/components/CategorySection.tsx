
const CategorySection = () => {
  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Food & Dining", icon: "🍴" },
    { name: "Travel", icon: "✈️" },
    { name: "Beauty", icon: "✨" },
    { name: "Home & Garden", icon: "🏠" },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse By Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="h-16 w-16 flex items-center justify-center bg-blue-100 rounded-full mb-3 text-2xl">
              {category.icon}
            </div>
            <span className="text-center font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
