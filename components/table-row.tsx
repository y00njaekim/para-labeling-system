import { TableCell, TableRow } from '@/components/table';
import { cn } from '@/lib/utils';

interface MyTableRowProps {
  key: number;
  tone: string;
  description: string;
  isSubmitted: boolean;
  children: React.ReactNode;
}

export const MyTableRow: React.FC<MyTableRowProps> = ({
  key,
  tone,
  description,
  isSubmitted,
  children,
}) => {
  return (
    <TableRow key={key} className={cn({ 'bg-gray-100': isSubmitted }, 'hover:bg-blue-transparent')}>
      <TableCell className="font-medium">{tone}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell className="flex gap-4 justify-between">{children}</TableCell>
    </TableRow>
  );
};
