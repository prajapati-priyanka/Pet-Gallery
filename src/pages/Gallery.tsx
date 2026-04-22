import  { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar/SearchBar';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import SortControls from '../../components/SortControls/SortControls';
// import { SortOption } from '../../types/pet';

/* ── layout ── */
const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
  margin-left: auto;
`;

const ActionBtn = styled.button`
  font-size: 12px;
  padding: 0 14px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 150ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Main = styled.main`
  padding: 28px 40px 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultMeta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

/* ── card ── */
const Card = styled.article<{ $selected: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1.5px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  overflow: hidden;
  cursor: pointer;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(216,90,48,0.10);
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.primaryMid};
  }
`;

const CardThumb = styled.div<{ $bg: string }>`
  height: 180px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  overflow: hidden;
  position: relative;
`;

const Checkbox = styled.button<{ $checked: boolean }>`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid ${({ $checked }) => ($checked ? 'transparent' : 'rgba(255,255,255,0.85)')};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : 'rgba(0,0,0,0.22)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 150ms ease;

  svg {
    width: 11px;
    height: 11px;
    stroke: #fff;
    stroke-width: 2.5;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: opacity 150ms ease;
  }

  &:hover {
    background: ${({ theme, $checked }) =>
      $checked ? theme.colors.primaryDark : 'rgba(0,0,0,0.4)'};
    border-color: transparent;
  }
`;

const CardBody = styled.div` padding: 12px 14px 14px; `;
const CardName = styled.h3` font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.colors.textPrimary}; margin-bottom: 4px; `;
const CardDesc = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
`;
const CardDate = styled.span` font-size: 11px; color: ${({ theme }) => theme.colors.textTertiary}; `;

/* ── pagination ── */
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 40px;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) => $active ? '#fff' : theme.colors.textSecondary};
  font-size: 13px;
  transition: all 150ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => $active ? '#fff' : theme.colors.primary};
  }
`;

/* ── selection bar ── */
const SelectionBar = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '100%')});
  transition: transform 280ms ease;
`;

const SelInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  strong { color: ${({ theme }) => theme.colors.textPrimary}; font-weight: 500; }
`;

const SelActions = styled.div` display: flex; gap: 8px; `;

const ClearBtn = styled.button`
  font-size: 13px;
  padding: 9px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 150ms ease;
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.primary}; }
`;

const DownloadBtn = styled.button`
  font-size: 13px;
  font-weight: 500;
  padding: 9px 22px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  transition: opacity 150ms ease;
  &:hover { opacity: 0.88; }
`;

/* ── static mock data ── */
const PETS = [
  { id:'1', emoji:'🐶', bg:'#FAECE7', name:'Buddy',  desc:'A friendly golden retriever who loves to play fetch at the park.',        date:'Apr 10, 2024' },
  { id:'2', emoji:'🐱', bg:'#EEEDFE', name:'Luna',   desc:'Curious tabby cat who explores every corner of the house quietly.',        date:'Mar 22, 2024' },
  { id:'3', emoji:'🐹', bg:'#FAEEDA', name:'Peanut', desc:'Tiny hamster with big energy — runs on his wheel all night long.',         date:'Feb 14, 2024' },
  { id:'4', emoji:'🐦', bg:'#E1F5EE', name:'Rio',    desc:'Colourful parrot who can mimic over 30 different words and melodies.',     date:'Jan 5, 2024'  },
  { id:'5', emoji:'🐢', bg:'#EAF3DE', name:'Shelly', desc:'Slow and steady tortoise who enjoys basking on warm sunlit rocks.',        date:'Dec 19, 2023' },
  { id:'6', emoji:'🐇', bg:'#FBEAF0', name:'Coco',   desc:'Fluffy white rabbit who thumps loudly whenever she wants attention.',      date:'Nov 30, 2023' },
  { id:'7', emoji:'🐠', bg:'#E6F1FB', name:'Nemo',   desc:'Bright orange clownfish living in a beautiful coral reef aquarium.',       date:'Oct 8, 2023'  },
  { id:'8', emoji:'🐕', bg:'#F1EFE8', name:'Max',    desc:'Energetic border collie who excels at agility training courses.',          date:'Sep 15, 2023' },
];

export default function GalleryPage() {
  const [search, setSearch]       = useState('');
//   const [sort, setSort]           = useState<SortOption>('name-asc');
  const [selected, setSelected]   = useState<Set<string>>(new Set(['1', '2']));

//   const toggle = (id: string) => {
//     setSelected(prev => {
//       const next = new Set(prev);
//     return  next.has(id) ? next.delete(id) : next.add(id);
      
//     });
//   };

  const selectAll = () => setSelected(new Set(PETS.map(p => p.id)));
  const clearAll  = () => setSelected(new Set());

  return (
    <Page>

      <Toolbar>
        <SearchBar value={search} onChange={setSearch} />
        {/* <SortControls value={sort} onChange={setSort} /> */}
        <ActionGroup>
          <ActionBtn onClick={selectAll}>Select all</ActionBtn>
          <ActionBtn onClick={clearAll}>Clear</ActionBtn>
        </ActionGroup>
      </Toolbar>

      <Main>
        <ResultMeta>Showing {PETS.length} of 20 pets</ResultMeta>

        <Grid>
          {PETS.map(pet => (
            <Card
              key={pet.id}
              $selected={selected.has(pet.id)}
              as={Link}
               to={`/pets/${pet.id}`}
              style={{ textDecoration: 'none' }}
            >
              <CardThumb $bg={pet.bg}>
                {pet.emoji}
                <Checkbox
                  $checked={selected.has(pet.id)}
                //   onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(pet.id); }}
                  aria-label="Select"
                >
                  <svg viewBox="0 0 12 12" fill="none">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </Checkbox>
              </CardThumb>
              <CardBody>
                <CardName>{pet.name}</CardName>
                <CardDesc>{pet.desc}</CardDesc>
                <CardDate>{pet.date}</CardDate>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <Pagination>
          <PageBtn $active>1</PageBtn>
          <PageBtn>2</PageBtn>
          <PageBtn>3</PageBtn>
          <PageBtn>›</PageBtn>
        </Pagination>
      </Main>

      <SelectionBar $visible={selected.size > 0}>
        <SelInfo>
          <strong>{selected.size}</strong> of 20 pets selected · ~{(selected.size * 512 / 1024).toFixed(1)} MB
        </SelInfo>
        <SelActions>
          <ClearBtn onClick={clearAll}>Clear selection</ClearBtn>
          <DownloadBtn>↓ Download selected</DownloadBtn>
        </SelActions>
      </SelectionBar>

    </Page>
  );
}
