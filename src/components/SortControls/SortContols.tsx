import styled from 'styled-components';
import type { SortOption } from '../../types/pets';


const Group = styled.div`
  display: flex;
  gap: 4px;
`;

const Btn = styled.button<{ $active: boolean }>`
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  padding: 0 14px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active }) => ($active ? '#fff' : 'inherit')};
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.primary)};
  }
`;

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Name A–Z',  value: 'name-asc'     },
  { label: 'Name Z–A',  value: 'name-desc'    },
  { label: 'Newest',    value: 'date-newest'  },
  { label: 'Oldest',    value: 'date-oldest'  },
];

interface Props {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

export default function SortControls({ value, onChange }: Props) {
  return (
    <Group>
      {OPTIONS.map(opt => (
        <Btn
          key={opt.value}
          $active={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Btn>
      ))}
    </Group>
  );
}
