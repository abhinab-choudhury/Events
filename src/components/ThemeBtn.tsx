'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Switch } from '@/components/ui/switch';

export function ThemeModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />
    </div>
  );
}
