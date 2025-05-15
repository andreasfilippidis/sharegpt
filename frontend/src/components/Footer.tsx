import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} AI Chat Share. All rights reserved.</p>
          <p className="mt-2">
            Share your interesting conversations with AI models.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;