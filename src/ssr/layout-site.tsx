import type { CounterRenderState } from '../core/state.js';
import type { VNodeChild } from '../jsx/jsx-runtime.js';
import {
  createCounterSite,
  type CounterSite,
  type CounterSiteConfig,
  type CounterSiteHydrationMode,
  type CounterSiteState,
  type FileSystemModule,
} from './counter-site.js';
import type { ShellRenderProps } from './runtime.js';

export type CounterSiteLayoutProps = ShellRenderProps<CounterRenderState>;
export type CounterSiteLayout = (props: CounterSiteLayoutProps) => VNodeChild;

export interface CounterLayoutSiteConfig extends Omit<CounterSiteConfig, 'pages' | 'shell'> {
  pages: Record<string, FileSystemModule<CounterSiteState>>;
  layout: CounterSiteLayout;
  hydrateMode?: CounterSiteHydrationMode;
}

export function createCounterLayoutSite(config: CounterLayoutSiteConfig): CounterSite {
  const { layout, ...rest } = config;
  const hydrateMode = config.hydrateMode ?? 'full';

  const site = createCounterSite({
    ...rest,
    shell: layout,
    hydrateMode,
  });

  if (hydrateMode !== 'none' && typeof window !== 'undefined') {
    site.hydrate();
  }

  return site;
}

export const defineCounterSite = createCounterLayoutSite;
