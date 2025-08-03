interface Props {
    userRole: 'admin' | 'contributor' | 'viewer';
    allow: ('admin' | 'contributor' | 'viewer')[];
    children: React.ReactNode;
  }
  
  export default function RoleGate({ userRole, allow, children }: Props) {
    return allow.includes(userRole) ? <>{children}</> : null;
  }
  