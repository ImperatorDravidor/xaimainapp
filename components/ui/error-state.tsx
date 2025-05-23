"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
  icon?: React.ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while processing your request. Please try again.",
  onRetry,
  fullPage = false,
  icon = <AlertCircle className="h-8 w-8 text-red-500" />,
}: ErrorStateProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8"
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button 
          variant="default" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      )}
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">{content}</Card>
      </div>
    );
  }

  return content;
}

// Specific error variants
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Network Error"
      message="We couldn't connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

export function NotFoundError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Not Found"
      message="The resource you're looking for doesn't exist or has been moved."
      onRetry={onRetry}
      icon={<AlertCircle className="h-8 w-8 text-amber-500" />}
    />
  );
}

export function PermissionError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Permission Denied"
      message="You don't have permission to access this resource. Please contact your administrator."
      onRetry={onRetry}
      icon={<AlertCircle className="h-8 w-8 text-amber-500" />}
    />
  );
}

export function TimeoutError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Request Timeout"
      message="The server took too long to respond. Please try again later."
      onRetry={onRetry}
    />
  );
} 