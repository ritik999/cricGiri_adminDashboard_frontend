import React, { useState } from 'react'

const SubDropDown = ({title,children}) => {
    const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            {title}
          </button>
    
          {isOpen && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              {children}
            </div>
          )}
        </div>
      );
}

export default SubDropDown