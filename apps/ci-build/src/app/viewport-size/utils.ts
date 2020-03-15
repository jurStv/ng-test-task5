import { IViewportConfig, ViewportSize } from './interfaces';

export const calculateViewportSize = (config: IViewportConfig, viewportWidth: number): ViewportSize => {
  const { medium, large } = config;

  // small: viewportWidth < config.medium
  if (viewportWidth < medium) return 'small';
  // medium: config.medium <= viewportWidth < config.large
  else if (viewportWidth < large) return 'medium';
  // large: config.large <= viewportWidth
  else return 'large';
}
