import React from 'react';

interface SkipToContentProps {
  targetId?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({ targetId = 'main-content' }) => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
      aria-label="Bỏ qua đến nội dung chính"
    >
      Bỏ qua đến nội dung chính
    </a>
  );
};

export default SkipToContent;