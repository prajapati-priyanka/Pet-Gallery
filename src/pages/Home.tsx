

import { Link } from 'react-router-dom';
import styled from 'styled-components';




const Main = styled.div`
  background: ${({ theme }) => theme.colors.bg};
`;

/* ── hero ── */
const Hero = styled.section`
  padding: 96px 40px 80px;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;


const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 52px;
  font-weight: 400;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 18px;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 600px) { font-size: 36px; }
`;

const Sub = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto 36px;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 13px 28px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.88; }
  text-decoration: none

`;


export default function HomePage() {
  return (
    <Main>

      {/* ── Hero ── */}
      <Hero>
        {/* <Eyebrow>20 pets to explore</Eyebrow> */}
        <H1>
          Meet our pets —<br />
          <em>browse, select &amp; download</em>
        </H1>
        <Sub>
          A curated collection of adorable pets. Search by name, sort by date,
          and download your favourites — all in one place.
        </Sub>
        <BtnRow>
          <PrimaryBtn to="/gallery">Browse gallery →</PrimaryBtn>
        </BtnRow>
      </Hero>


    </Main>
  );
}
