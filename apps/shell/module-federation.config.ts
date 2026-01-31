import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  // remotes: [
  //   'system_admin',
  //   'admin',
  //   'roles_mfe',
  //   'universities_mfe',
  //   'auth_mfe',
  //   'dashboard_mfe',
  //   'university_administration_mfe',
  //   'faculty_administration_mfe',
  //   'student_mfe',
  //   'system_admin_mfe',
  //   'stuff_mfe',
  // ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
