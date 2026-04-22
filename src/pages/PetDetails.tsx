import { useState } from 'react';
import { Link} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  animation: ${fadeUp} 0.4s ease both;
`;

/* ── breadcrumb ── */
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textTertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const BreadLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.75; }
`;

const Sep = styled.span` color: ${({ theme }) => theme.colors.border}; `;

/* ── main layout ── */
const Content = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

/* ── image panel ── */
const ImagePanel = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primaryLight};
`;

const PetImage = styled.div`
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  background: #FAECE7;
`;

const ImageMeta = styled.div`
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageMetaText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const DownloadImgBtn = styled.button`
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.primaryMid};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 150ms ease;
  &:hover { background: ${({ theme }) => theme.colors.primaryMid}; color: #fff; }
`;

/* ── info panel ── */
const InfoPanel = styled.div``;

const PetName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 38px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const DateBadge = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textTertiary};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

/* ── actions ── */
const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 36px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 11px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.88; }
`;

const SecondaryBtn = styled.button<{ $active?: boolean }>`
  font-size: 14px;
  padding: 11px 22px;
  background: ${({ theme, $active }) => $active ? theme.colors.primaryLight : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primaryDark : theme.colors.textSecondary};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primaryMid : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 150ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMid};
    color: ${({ theme }) => theme.colors.primaryDark};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

/* ── back link ── */
const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textTertiary};
  transition: color 150ms ease;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

/* ── related ── */
const Related = styled.section`
  max-width: 1000px;
  margin: 0 auto 60px;
  padding: 0 40px;
`;

const RelatedTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 700px) { grid-template-columns: repeat(2, 1fr); }
`;

const RelatedCard = styled(Link)`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  transition: transform 220ms ease, border-color 220ms ease;
  &:hover { transform: translateY(-2px); border-color: ${({ theme }) => theme.colors.primaryMid}; }
`;

const RelThumb = styled.div<{ $bg: string }>`
  height: 90px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
`;

const RelName = styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 8px 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const RelDate = styled.div`
  font-size: 10px;
  padding: 0 10px 8px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

/* ── static data ── */
const RELATED = [
  { id:'2', emoji:'🐱', bg:'#EEEDFE', name:'Luna',   date:'Mar 22, 2024' },
  { id:'3', emoji:'🐹', bg:'#FAEEDA', name:'Peanut', date:'Feb 14, 2024' },
  { id:'4', emoji:'🐦', bg:'#E1F5EE', name:'Rio',    date:'Jan 5, 2024'  },
  { id:'5', emoji:'🐢', bg:'#EAF3DE', name:'Shelly', date:'Dec 19, 2023' },
];

export default function PetDetails() {
//   const { id } = useParams();
  const [inSelection, setInSelection] = useState(false);

  return (
    <Page>

      <Breadcrumb>
        <BreadLink to="/">Home</BreadLink>
        <Sep>/</Sep>
        <BreadLink to="/gallery">Gallery</BreadLink>
        <Sep>/</Sep>
        <span style={{ color: 'inherit' }}>Buddy</span>
      </Breadcrumb>

      <Content>

        {/* ── Left: image ── */}
        <ImagePanel>
          <PetImage>🐶</PetImage>
          <ImageMeta>
            <ImageMetaText>Added Apr 10, 2024</ImageMetaText>
            <DownloadImgBtn>↓ Download</DownloadImgBtn>
          </ImageMeta>
        </ImagePanel>

        {/* ── Right: info ── */}
        <InfoPanel>
          <BackLink to="/gallery">← Back to gallery</BackLink>

          <PetName style={{ marginTop: 16 }}>Buddy</PetName>

          <DateRow>
            <DateBadge>Added Apr 10, 2024</DateBadge>
          </DateRow>

          <Description>
            A friendly golden retriever who loves to play fetch at the park on sunny days.
            He gets along well with everyone he meets and has a cheerful, gentle temperament
            that makes him a joy to be around. Whether it's a long walk or a lazy afternoon
            nap, Buddy is always great company.
          </Description>

          <Actions>
            <PrimaryBtn>↓ Download image</PrimaryBtn>
            <SecondaryBtn
              $active={inSelection}
              onClick={() => setInSelection(p => !p)}
            >
              {inSelection ? '✓ In selection' : '+ Add to selection'}
            </SecondaryBtn>
          </Actions>

        </InfoPanel>
      </Content>

      {/* ── Related pets ── */}
      <Related>
        <RelatedTitle>More pets</RelatedTitle>
        <RelatedGrid>
          {RELATED.map(r => (
            <RelatedCard key={r.id} to={`/pets/${r.id}`}>
              <RelThumb $bg={r.bg}>{r.emoji}</RelThumb>
              <RelName>{r.name}</RelName>
              <RelDate>{r.date}</RelDate>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </Related>

    </Page>
  );
}
