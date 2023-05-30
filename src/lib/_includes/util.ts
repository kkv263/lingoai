import type { EncodedParams } from '$lib/types/util';

// One liner to transform json into application/x-www-form-urlencoded payload.
export const encodeFormBody = (params:EncodedParams): string => {
  return Object.entries(params).flatMap(([key,val]) => val ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof EncodedParams])}` : []).join('&');
}
