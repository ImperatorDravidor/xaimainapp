import * as React from 'react';
import { cn } from "@/lib/utils";
import { TableRowSkeleton } from './skeleton';

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  isLoading?: boolean;
  loadingRows?: number;
  onRowClick?: (row: T) => void;
  rowClassName?: string | ((row: T, index: number) => string);
  emptyState?: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  loadingRows = 5,
  onRowClick,
  rowClassName,
  emptyState,
  className,
  hideHeader = false,
}: DataTableProps<T>) {
  const renderCell = (row: T, accessor: keyof T | ((row: T) => React.ReactNode)): React.ReactNode => {
    if (typeof accessor === 'function') {
      return accessor(row);
    }
    
    return row[accessor] as React.ReactNode;
  };

  const getRowClassName = (row: T, index: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index);
    }
    
    return rowClassName || '';
  };

  if (isLoading) {
    return (
      <div className={cn("w-full", className)}>
        {!hideHeader && (
          <div className="grid gap-3 rounded-t-lg bg-muted/30 p-3 text-sm font-medium text-muted-foreground" 
               style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
            {columns.map((column, index) => (
              <div key={index} className={cn("", column.className)}>
                {column.header}
              </div>
            ))}
          </div>
        )}
        <div className="rounded-b-lg border border-border bg-card divide-y divide-border">
          {Array(loadingRows).fill(0).map((_, index) => (
            <div key={index} className="p-3">
              <TableRowSkeleton columns={columns.length} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-8 flex items-center justify-center">
        {emptyState || (
          <div className="text-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {!hideHeader && (
        <div className="grid gap-3 rounded-t-lg bg-muted/30 p-3 text-sm font-medium text-muted-foreground" 
             style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column, index) => (
            <div key={index} className={cn("", column.className)}>
              {column.header}
            </div>
          ))}
        </div>
      )}
      <div className="rounded-b-lg border border-border bg-card divide-y divide-border">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "grid gap-3 p-3 text-sm",
              onRowClick && "cursor-pointer hover:bg-muted/30 transition-ios",
              getRowClassName(row, rowIndex)
            )}
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className={cn("truncate", column.className)}>
                {renderCell(row, column.accessor)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 