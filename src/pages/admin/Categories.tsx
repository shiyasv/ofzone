import React, { useState } from 'react';
import { mockCategories, Category } from '../../data/mockData';
import { 
  Plus, 
  Pencil, 
  Trash, 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'id'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Filter categories based on search query
  const filteredCategories = categories.filter(
    category => category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc'
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
  });
  
  const handleSort = (field: 'name' | 'id') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setIsModalOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };
  
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      if (editingCategory.id) {
        // Update existing category
        setCategories(categories.map(cat => 
          cat.id === editingCategory.id ? editingCategory : cat
        ));
      } else {
        // Add new category
        const newCategory = {
          ...editingCategory,
          id: String(categories.length + 1)
        };
        setCategories([...categories, newCategory]);
      }
    }
    
    handleCloseModal();
  };
  
  const handleAddNew = () => {
    setEditingCategory({
      id: '',
      name: '',
      description: '',
      image: 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      slug: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Categories</h1>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Category
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary flex items-center">
              <Filter size={18} className="mr-1" />
              Filter
            </button>
            <button 
              onClick={() => setSearchQuery('')}
              className={`btn btn-secondary ${!searchQuery ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!searchQuery}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {/* Categories table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(category)}
                        className="text-primary-600 hover:text-primary-900 p-1"
                        aria-label="Edit category"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        aria-label="Delete category"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {sortedCategories.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No categories found. Try a different search or add a new category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCategory?.id ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveCategory}>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <label htmlFor="name" className="label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={editingCategory?.name || ''}
                    onChange={(e) => setEditingCategory({ 
                      ...editingCategory!,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="label">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    className="input"
                    value={editingCategory?.description || ''}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory!,
                      description: e.target.value
                    })}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="image" className="label">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    className="input"
                    value={editingCategory?.image || ''}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory!,
                      image: e.target.value
                    })}
                    required
                  />
                  <div className="mt-2 flex items-center">
                    <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 mr-4">
                      {editingCategory?.image ? (
                        <img 
                          src={editingCategory.image} 
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary text-sm flex items-center"
                    >
                      <Upload size={14} className="mr-1" />
                      Upload Image
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="slug" className="label">Slug</label>
                  <input
                    type="text"
                    id="slug"
                    className="input"
                    value={editingCategory?.slug || ''}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory!,
                      slug: e.target.value
                    })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Used in URLs, auto-generated from name
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingCategory?.id ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;