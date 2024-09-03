'use client';

import { queryClient } from '@/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
