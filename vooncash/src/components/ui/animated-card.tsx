"use client";

import { motion } from "framer-motion";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedCardProps extends CardProps {
  delay?: number;
  children: React.ReactNode;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(className)}
      >
        <Card {...props}>
          {children}
        </Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";
