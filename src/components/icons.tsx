import type { SVGProps } from 'react';

export function NailPolish(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
      <path d="M6 6.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5a.5.5 0 0 1-1 0V7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2a.5.5 0 0 1-1 0V6.5z" />
      <path d="M6 9.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.17a3 3 0 0 1-.397 1.5c-.754 1.3-2.065 2.83-3.103 4.133a.5.5 0 0 1-.794-.012C8.66 14.99 7.35 13.47 6.6 12.17A3 3 0 0 1 6 10.67V9.5z" />
    </svg>
  );
}
