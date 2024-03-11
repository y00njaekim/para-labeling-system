import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';

interface MyTableProps {
  children: React.ReactNode;
}

export const MyTable: React.FC<MyTableProps> = ({ children }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12 min-w-24">어조</TableHead>
          <TableHead className="w-5/12">설명</TableHead>
          <TableHead className="w-6/12">입력</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
