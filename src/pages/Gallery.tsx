import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar/SearchBar";
import { usePets } from "../hooks/usePets";
import ShimmerUI from "../components/ShimmerUI/ShimmerUI";
import { filterPets, sortPets } from "../utils/filter";
import ErrorState from "../components/ErrorState/ErrorState";
import type { SortOption } from "../types/pets";
import SortControls from "../components/SortControls/SortContols";
import { useDownload } from "../hooks/useDownload";
import { useSelection } from "../hooks/useSelection";

// Page layout
const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

// Top toolbar containing search + sort + actions
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;

  @media (max-width: 600px) {
    padding: 12px 16px;
    gap: 8px;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
  }
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

  @media (max-width: 600px) {
    flex: 1;
    height: 36px;
  }
`;

// Main content container
const Main = styled.main`
  padding: 28px 40px 120px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 20px 16px 140px;
  }
`;

const ResultMeta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-bottom: 20px;
`;

// Responsive grid for cards
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// card
const Card = styled.article<{ $selected: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1.5px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(216, 90, 48, 0.1);
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.primaryMid};
  }
`;

const CardThumb = styled.div`
  aspect-ratio: 3 / 4;
  width: 100%;
  background: ${({ theme }) => theme.colors.primaryLight};
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 400ms ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

// Checkbox for selecting items
const Checkbox = styled.button<{ $checked: boolean }>`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid
    ${({ $checked }) => ($checked ? "transparent" : "rgba(255,255,255,0.85)")};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : "rgba(0,0,0,0.22)"};
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
      $checked ? theme.colors.primaryDark : "rgba(0,0,0,0.4)"};
    border-color: transparent;
  }
`;

const CardBody = styled.div`
  padding: 12px 14px 14px;
`;
const CardName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;
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
const CardDate = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

// pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 40px;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 15px;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? "#fff" : theme.colors.textSecondary};
  font-size: 13px;
  transition: all 150ms ease;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => ($active ? "#fff" : theme.colors.primary)};
  }
`;

// selection bar
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

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
  }
`;

const SelInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 500;
  }
`;

const SelActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ClearBtn = styled.button`
  font-size: 13px;
  padding: 9px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 150ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 600px) {
    flex: 1;
  }
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

  @media (max-width: 600px) {
    flex: 1;
  }
`;

const PAGE_SIZE = 8;

export default function GalleryPage() {
  const { petsData, loading, error, refetch } = usePets();

  //  Global selection state (context)
  const { selectAll, clear, isSelected, toggle, count, selectedIds } =
    useSelection();

  // File Download utilities
  const { estimateSize, downloadAll } = useDownload();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [page, setPage] = useState(1);

  //  search filter
  const filteredPets = filterPets(petsData, search);

  // sorting
  const sorted = sortPets(filteredPets, sort);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Select all currently visible (filtered) pets
  const handleSelectAll = () => selectAll(filteredPets?.map((p) => p.id));

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Reset to first page when sort changes
  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };

  // Get selected pets
  const selectedPets = petsData.filter((p) => selectedIds.has(p.id));

  // Error handling from API
  if (error)
    return (
      <Page>
        <ErrorState message={error} onRetry={refetch} />
      </Page>
    );

  return (
    <Page>
      <Toolbar>
        <SearchBar value={search} onChange={handleSearchChange} />
        <SortControls value={sort} onChange={handleSortChange} />
        <ActionGroup>
          <ActionBtn onClick={handleSelectAll}>Select all</ActionBtn>
          <ActionBtn onClick={clear}>Clear</ActionBtn>
        </ActionGroup>
      </Toolbar>

      <Main>
        {loading ? (
          // Loading Skeleton
          <ShimmerUI count={PAGE_SIZE} />
        ) : (
          <>
            <ResultMeta>
              {" "}
              {search
                ? `${sorted.length} result${sorted.length !== 1 ? "s" : ""} for "${search}"`
                : `Showing ${paginated.length} of ${petsData.length} pets`}
            </ResultMeta>

            <Grid>
              {paginated?.map((pet) => (
                <Card
                  key={pet.id}
                  $selected={isSelected(pet.id)}
                  as={Link}
                  to={`/pets/${pet.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardThumb>
                    <CardImg src={pet.url} alt={pet.title} />
                    <Checkbox
                      $checked={isSelected(pet.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(pet.id);
                      }} // prevent event bubbling when clicked on checkbox
                      aria-label="Select"
                    >
                      <svg viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    </Checkbox>
                  </CardThumb>
                  <CardBody>
                    <CardName>{pet.title}</CardName>
                    <CardDesc>{pet.description}</CardDesc>
                    <CardDate>{pet.created}</CardDate>
                  </CardBody>
                </Card>
              ))}
            </Grid>

            {/* Pagination Section */}
            {totalPages > 1 && (
              <Pagination>
                <NavBtn
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                  title="Previous page"
                >
                  ←
                </NavBtn>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PageBtn
                    key={i + 1}
                    $active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PageBtn>
                ))}

                <NavBtn
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                  title="Next page"
                >
                  →
                </NavBtn>
              </Pagination>
            )}
          </>
        )}
      </Main>

      {/* Bottom selection bar appears ONLY when items selected */}
      <SelectionBar $visible={count > 0}>
        <SelInfo>
          <strong>{count}</strong> of {petsData.length} selected ·{" "}
          {estimateSize(count)}
        </SelInfo>
        <SelActions>
          <ClearBtn onClick={clear}>Clear selection</ClearBtn>
          <DownloadBtn onClick={() => downloadAll(selectedPets)}>
            ↓ Download selected
          </DownloadBtn>
        </SelActions>
      </SelectionBar>
    </Page>
  );
}
