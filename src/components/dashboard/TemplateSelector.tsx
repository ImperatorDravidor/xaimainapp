"use client";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Template } from "@/lib/data";

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (templateId: string) => void;
  onCancel: () => void;
  deployingTemplate: string | null;
}

export function TemplateSelector({ 
  templates, 
  onSelect, 
  onCancel, 
  deployingTemplate 
}: TemplateSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-8 relative z-10">
        <CardHeader>
          <CardTitle>Select an Industry Template</CardTitle>
          <CardDescription>
            Choose a pre-configured template to instantly deploy a specialized AI team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => onSelect(template.id)}
                disabled={deployingTemplate === template.id}
                className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-medium text-white">{template.name}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{template.description}</p>
                {deployingTemplate === template.id ? (
                  <div className="mt-3">
                    <p className="text-sm text-blue-400 flex items-center">
                      <Clock className="animate-spin h-3 w-3 mr-2" />
                      Deploying...
                    </p>
                    <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-blue-500 mt-3 font-medium">Click to deploy</p>
                )}
              </motion.button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant="ghost" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 