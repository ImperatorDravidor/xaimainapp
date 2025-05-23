"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Card } from './card';

interface LoadingStateProps {
  title?: string;
  message?: string;
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  transparent?: boolean;
}

export function LoadingState({
  title = "Loading",
  message = "Please wait while we retrieve the data...",
  fullPage = false,
  size = 'md',
  transparent = false,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center p-6 ${transparent ? '' : 'bg-card/50'}`}
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-4`} />
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {message && <p className="text-muted-foreground max-w-md">{message}</p>}
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        {transparent ? (
          content
        ) : (
          <Card className="max-w-md w-full">{content}</Card>
        )}
      </div>
    );
  }

  return content;
}

// Specialized variants for different loading contexts
export function DataLoadingState({ fullPage = false }) {
  return (
    <LoadingState
      title="Loading Data"
      message="Please wait while we retrieve the latest information..."
      fullPage={fullPage}
    />
  );
}

export function ProcessingState({ fullPage = false }) {
  return (
    <LoadingState
      title="Processing"
      message="Your request is being processed. This may take a moment..."
      fullPage={fullPage}
    />
  );
}

export function TableLoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingState
        title="Loading Table Data"
        message="Retrieving and preparing data for display..."
        transparent={true}
        size="sm"
      />
    </div>
  );
}

export function InlineLoading() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="h-3 w-3 animate-spin" />
      <span className="text-xs">Loading...</span>
    </div>
  );
}

export function ButtonLoading() {
  return <Loader2 className="h-4 w-4 animate-spin" />;
} 