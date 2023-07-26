export const generateRouterBasePath = (year) => {
  let basename = '';

  const previewPattern = /\/preview\/pr-\d+/;

  const matchPreviewDeployment = window.location.pathname.match(previewPattern);

  if (matchPreviewDeployment) basename += matchPreviewDeployment[0];

  if (window.location.pathname.replace(previewPattern, '').startsWith(`/${year}`)) basename += `/${year}`;

  return basename;
};
