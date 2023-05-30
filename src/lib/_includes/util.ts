import type { encodedParams } from '$lib/types/util';

// One liner to transform json into application/x-www-form-urlencoded payload.
export const encodeFormBody = (params:encodedParams): string => {
  return Object.entries(params).flatMap(([key,val]) => val ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof encodedParams])}` : []).join('&');
}
