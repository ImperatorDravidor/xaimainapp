"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/layout";

type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  showBackLink?: boolean;
  backLinkHref?: string;
  backLinkText?: string;
  actions?: ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
  noCard?: boolean;
};

export function PageLayout({
  children,
  title,
  description,
  showBackLink = false,
  backLinkHref = "",
  backLinkText = "Back",
  actions,
  fullWidth = false,
  noPadding = false,
  noCard = false,
}: PageLayoutProps) {
  return (
    <DashboardLayout>
      <div className={`${fullWidth ? "w-full" : "max-w-[1800px] mx-auto"} p-4 md:p-6`}>
        {/* Page Header */}
        {(title || description || actions) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                {showBackLink && (
                  <a
                    href={backLinkHref}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    {backLinkText}
                  </a>
                )}
                {title && <h1 className="text-2xl font-semibold mb-1">{title}</h1>}
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          </motion.div>
        )}

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {noCard ? (
            children
          ) : (
            <Card className={noPadding ? "" : "p-4 md:p-6"}>{children}</Card>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 