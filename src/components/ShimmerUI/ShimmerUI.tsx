import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

const SkeletonCard = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

const Bone = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bg} 25%,
    #e8e0dc 50%,
    ${({ theme }) => theme.colors.bg} 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const ImageBone = styled(Bone)` height: 180px; `;
const BodyWrap = styled.div` padding: 12px 14px 14px; `;
const TitleBone = styled(Bone)` height: 14px; border-radius: 4px; width: 55%; margin-bottom: 8px; `;
const DescBone  = styled(Bone)` height: 11px; border-radius: 4px; margin-bottom: 5px; `;
const DescBoneShort = styled(Bone)` height: 11px; border-radius: 4px; width: 70%; margin-bottom: 8px; `;
const DateBone  = styled(Bone)` height: 10px; border-radius: 4px; width: 35%; `;

const SkeletonItem = () => (
  <SkeletonCard>
    <ImageBone />
    <BodyWrap>
      <TitleBone />
      <DescBone />
      <DescBoneShort />
      <DateBone />
    </BodyWrap>
  </SkeletonCard>
);

export default function ShimmerUI({ count = 8 }: { count?: number }) {
  return (
    <Grid>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </Grid>
  );
}
