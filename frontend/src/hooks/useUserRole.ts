import { useEffect, useState } from 'react';

export function useUserRole(userId: string) {
  const [role, setRole] = useState<'admin' | 'contributor' | 'viewer'>('viewer');

  useEffect(() => {
    fetch(`/roles/${userId}`)
      .then(res => res.json())
      .then(data => setRole(data.role))
      .catch(() => setRole('viewer'));
  }, [userId]);

  return role;
}
