import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'system_admin_mfe',
  exposes: {
    './Module': 'apps/dashboards/system_admin_mfe/src/app/remote-entry/entry-module.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
