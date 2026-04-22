import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 14px;
  height: 40px;
  flex: 1;
  min-width: 200px;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Icon = styled.svg`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  stroke: ${({ theme }) => theme.colors.textTertiary};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  width: 100%;

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textTertiary};
  line-height: 1;
  display: flex;
  align-items: center;
  &:hover { color: ${({ theme }) => theme.colors.textSecondary}; }
`;

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Wrap>
      <Icon viewBox="0 0 15 15" fill="none" strokeWidth="1.6">
        <circle cx="6.5" cy="6.5" r="4.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" />
      </Icon>
      <Input
        type="text"
        placeholder="Search by name or description…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search pets"
      />
      {value && <ClearBtn onClick={() => onChange('')} aria-label="Clear search">×</ClearBtn>}
    </Wrap>
  );
}
