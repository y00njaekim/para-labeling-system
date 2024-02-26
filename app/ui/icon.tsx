export function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="8 3 22 12 8 21 8 3" />
    </svg>
  );
}

export function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="4" width="4" height="16" />
      <rect x="15" y="4" width="4" height="16" />
    </svg>
  );
}

export function MicrophoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox="0 0 24 24"
    >
      <path d="M12 1C10.343 1 9 2.343 9 4V11C9 12.657 10.343 14 12 14C13.657 14 15 12.657 15 11V4C15 2.343 13.657 1 12 1ZM17 11V4C17 1.791 15.209 0 13 0H11C8.791 0 7 1.791 7 4V11C7 13.209 8.791 15 11 15H13C15.209 15 17 13.209 17 11Z" />
      <path d="M19 10V12C19 15.755 16.072 18.875 12.5 18.975V21H15V23H9V21H11.5V18.975C7.928 18.875 5 15.755 5 12V10H3V12C3 16.451 6.481 20.065 11 20.463V23H13V20.463C17.519 20.065 21 16.451 21 12V10H19Z" />
    </svg>
  );
}

export function StopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '24'}
      height={props.height || '24'}
      viewBox="0 0 24 24"
    >
      <path d="M18 6H6C4.897 6 4 6.897 4 8V16C4 17.103 4.897 18 6 18H18C19.103 18 20 17.103 20 16V8C20 6.897 19.103 6 18 6ZM18 16H6V8H18V16Z" />
    </svg>
  );
}
