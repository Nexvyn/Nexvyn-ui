import React from 'react';

export interface PreviewProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Preview({ children, title, description, className = '' }: PreviewProps) {
  return (
    <div className={`my-6 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold mb-2 text-foreground">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      <div className="border rounded-lg p-6 bg-muted/50">
        {children}
      </div>
    </div>
  );
}

export default Preview;

