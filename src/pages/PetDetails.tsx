import { useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { usePets } from '../hooks/usePets';
import { useDownload } from '../hooks/useDownload';
import { formatDate } from '../utils/filter';
import { useSelection } from '../hooks/useSelection';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div` min-height: 100vh; background: ${({ theme }) => theme.colors.bg}; animation: ${fadeUp} 0.4s ease both; `;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 8px; padding: 16px 40px;
  font-size: 13px; color: ${({ theme }) => theme.colors.textTertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;
const BreadLink = styled(Link)` color: ${({ theme }) => theme.colors.primary}; transition: opacity 150ms ease; &:hover { opacity: 0.75; } `;
const Sep = styled.span` color: ${({ theme }) => theme.colors.border}; `;

const Content = styled.div`
  max-width: 1000px; margin: 40px auto; padding: 0 40px;
  display: grid; grid-template-columns: 420px 1fr; gap: 40px; align-items: start;
  @media (max-width: 800px) { grid-template-columns: 1fr; }
`;

const ImagePanel = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg}; overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
const PetImg = styled.img`
  width: 100%; height: 360px; object-fit: cover; display: block;
  background: ${({ theme }) => theme.colors.primaryLight};
`;
const PetImgFallback = styled.div`
  width: 100%; height: 360px; background: ${({ theme }) => theme.colors.primaryLight};
  display: flex; align-items: center; justify-content: center; font-size: 100px;
`;
const ImageMeta = styled.div`
  padding: 14px 16px; background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex; align-items: center; justify-content: space-between;
`;
const ImageMetaText = styled.span` font-size: 12px; color: ${({ theme }) => theme.colors.textTertiary}; `;
const DlImgBtn = styled.button`
  font-size: 12px; font-weight: 500; padding: 6px 14px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.primaryMid};
  border-radius: ${({ theme }) => theme.radii.md}; transition: all 150ms ease;
  &:hover { background: ${({ theme }) => theme.colors.primaryMid}; color: #fff; }
  cursor: pointer
`;

const InfoPanel = styled.div``;
const BackLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 6px; font-size: 13px;
  color: ${({ theme }) => theme.colors.textTertiary}; transition: color 150ms ease;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;
const PetName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display}; font-size: 38px;
  font-weight: 400; color: ${({ theme }) => theme.colors.textPrimary};
  margin: 16px 0 8px;
`;
const DateBadge = styled.span`
  font-size: 12px; color: ${({ theme }) => theme.colors.textTertiary};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3px 10px; border-radius: ${({ theme }) => theme.radii.full};
  display: inline-block; margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 15px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.8;
  margin-bottom: 32px; padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
const Actions = styled.div` display: flex; gap: 10px; flex-wrap: wrap; `;
const PrimaryBtn = styled.button`
  font-size: 14px; font-weight: 500; padding: 11px 24px;
  background: ${({ theme }) => theme.colors.primary}; color: #fff; border: none;
  border-radius: ${({ theme }) => theme.radii.md}; transition: opacity 150ms ease;
  &:hover { opacity: 0.88; }
  cursor:pointer;
`;
const SecondaryBtn = styled.button<{ $active?: boolean }>`
  font-size: 14px; padding: 11px 22px;
  background: ${({ theme, $active }) => $active ? theme.colors.primaryLight : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primaryDark : theme.colors.textSecondary};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primaryMid : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}; transition: all 150ms ease;
  cursor:pointer;
  &:hover { border-color: ${({ theme }) => theme.colors.primaryMid}; color: ${({ theme }) => theme.colors.primaryDark}; background: ${({ theme }) => theme.colors.primaryLight}; }
`;

const Related = styled.section` max-width: 1000px; margin: 0 auto 60px; padding: 0 40px; `;
const RelTitle = styled.h2` font-size: 16px; font-weight: 500; color: ${({ theme }) => theme.colors.textSecondary}; margin-bottom: 16px; `;
const RelGrid  = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  @media (max-width: 700px) { grid-template-columns: repeat(2, 1fr); }
`;
const RelCard = styled(Link)`
  display: block; border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg}; overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  transition: transform 220ms ease, border-color 220ms ease;
  &:hover { transform: translateY(-2px); border-color: ${({ theme }) => theme.colors.primaryMid}; }
`;
const RelImg = styled.img` width: 100%; height: 90px; object-fit: cover; display: block; background: ${({ theme }) => theme.colors.primaryLight}; `;
const RelImgFallback = styled.div` width: 100%; height: 90px; background: ${({ theme }) => theme.colors.primaryLight}; display: flex; align-items: center; justify-content: center; font-size: 32px; `;
const RelName = styled.div` font-size: 12px; font-weight: 500; padding: 8px 10px 2px; color: ${({ theme }) => theme.colors.textPrimary}; `;
const RelDesc = styled.div` font-size: 10px; padding: 0 10px 8px; color: ${({ theme }) => theme.colors.textTertiary}; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; `;

const NotFound = styled.div` text-align: center; padding: 80px 40px; font-size: 16px; color: ${({ theme }) => theme.colors.textSecondary}; `;

const RelImgWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [err, setErr] = useState(false);
  if (err || !src) return <RelImgFallback>🐾</RelImgFallback>;
  return <RelImg src={src} alt={alt} onError={() => setErr(true)} />;
};

export default function DetailPage() {
  const { id }       = useParams<{ id: string }>();
  const { petsData, loading } = usePets();
  const { toggle, isSelected }  = useSelection();
  const { downloadSingle }      = useDownload();
  

  const [imgErr, setImgErr] = useState(false);

  if (loading) return (
    <Page>
      <div style={{ padding: '80px 40px', textAlign: 'center', color: '#aaa' }}>Loading…</div>
    </Page>
  );

  const pet = petsData.find(p => p.id === id);
  if (!pet) return (
    <Page>
      <NotFound>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
        <div>Pet not found.</div>
        <Link to="/gallery" style={{ color: '#D85A30', marginTop: 16, display: 'inline-block' }}>← Back to gallery</Link>
      </NotFound>
    </Page>
  );

  const related = petsData.filter(p => p.id !== pet.id).slice(0, 4);
  const selected = isSelected(pet.id);

  return (
    <Page>
      <Breadcrumb>
        <BreadLink to="/">Home</BreadLink>
        <Sep>/</Sep>
        <BreadLink to="/gallery">Gallery</BreadLink>
        <Sep>/</Sep>
        <span>{pet.title}</span>
      </Breadcrumb>

      <Content>
        <ImagePanel>
          {pet.url && !imgErr
            ? <PetImg src={pet.url} alt={pet.title} onError={() => setImgErr(true)} />
            : <PetImgFallback>🐾</PetImgFallback>}
          <ImageMeta>
            <ImageMetaText>{formatDate(pet.created)}</ImageMetaText>
            <DlImgBtn onClick={() => downloadSingle(pet)}>↓ Download</DlImgBtn>
          </ImageMeta>
        </ImagePanel>

        <InfoPanel>
          <BackLink to="/gallery">← Back to gallery</BackLink>
          <PetName>{pet.title}</PetName>
          <DateBadge>Added {formatDate(pet.created)}</DateBadge>
          <Description>{pet.description}</Description>
          <Actions>
            <PrimaryBtn onClick={() => downloadSingle(pet)}>↓ Download image</PrimaryBtn>
            <SecondaryBtn $active={selected} onClick={() => toggle(pet.id)}>
              {selected ? '✓ In selection' : '+ Add to selection'}
            </SecondaryBtn>
          </Actions>
        </InfoPanel>
      </Content>

      {related.length > 0 && (
        <Related>
          <RelTitle>More pets</RelTitle>
          <RelGrid>
            {related.map(r => (
              <RelCard key={r.id} to={`/pets/${r.id}`}>
                <RelImgWithFallback src={r.url} alt={r.title} />
                <RelName>{r.title}</RelName>
                <RelDesc>{r.description}</RelDesc>
              </RelCard>
            ))}
          </RelGrid>
        </Related>
      )}
    </Page>
  );
}
