import type { EncodedParams } from '$lib/types/util';

// One liner to transform json into application/x-www-form-urlencoded payload.
export const encodeFormBody = (params:EncodedParams): string => {
  return Object.entries(params).flatMap(([key,val]) => val ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof EncodedParams])}` : []).join('&');
}

export const clickOutside = (
  node: HTMLElement,
  handler: () => void
): { destroy: () => void } => {
  const onClick = (event: MouseEvent) =>
    node &&
    !node.contains(event.target as HTMLElement) &&
    !event.defaultPrevented &&
    handler();

  document.addEventListener('click', onClick, true);

  return {
    destroy() {
      document.removeEventListener('click', onClick, true);
    },
  };
}

export const convertTimestampsToLocale = (time:string) => {
 return new Date(time).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })
}