import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { updateMetaTags } from '../utils/seo';

export default function NotFoundPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Page Not Found | ATELIER',
      description: 'The requested page could not be located in the ATELIER showroom.',
    });
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <span className="font-caption text-[#72503C] tracking-[0.25em] mb-4">
        404 ERROR
      </span>
      <h1 className="font-display-hero text-[#181818] font-medium mb-4">
        Out of Space.
      </h1>
      <p className="font-body-lead text-[#76726B] max-w-md mb-8">
        The architectural route you are seeking does not exist or has been relocated to another gallery.
      </p>
      <div className="flex gap-4">
        <Button to="/" variant="primary">
          Return Home
        </Button>
        <Button to="/collections" variant="outline">
          Explore Catalog
        </Button>
      </div>
    </div>
  );
}
