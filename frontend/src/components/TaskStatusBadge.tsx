interface Props {
    status: 'pending' | 'in-progress' | 'done';
  }
  
  export default function TaskStatusBadge({ status }: Props) {
    const colors = {
      pending: 'bg-yellow-300',
      'in-progress': 'bg-blue-400',
      done: 'bg-green-400'
    };
  
    return (
      <span className={`text-xs px-2 py-1 rounded ${colors[status]}`}>
        {status}
      </span>
    );
  }
  