import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

/* ── hero band ── */
const HeroBand = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 64px 40px;
  text-align: center;
  animation: ${fadeUp} 0.45s ease both;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 26px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-family: ${({ theme }) => theme.fonts.display};
`;

const DevName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 34px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaryDeep};
  margin-bottom: 6px;
`;

const DevRole = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 20px;
`;

const Bio = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primaryDeep};
  line-height: 1.75;
  max-width: 520px;
  margin: 0 auto;
`;

/* ── body ── */
const Body = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 56px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  animation: ${fadeUp} 0.45s 0.1s ease both;
  opacity: 0;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

/* ── skills ── */
const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled.span<{ $primary?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 13px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $primary }) => $primary ? theme.colors.primaryLight : theme.colors.bg};
  color: ${({ theme, $primary }) => $primary ? theme.colors.primaryDark : theme.colors.textSecondary};
  border: 1px solid ${({ theme, $primary }) => $primary ? theme.colors.primaryMid : theme.colors.border};
`;

/* ── timeline ── */
const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 12px;
`;

const TDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: 5px;
  flex-shrink: 0;
`;

const TContent = styled.div``;

const TTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const TDesc = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

/* ── contact ── */
const FullWidth = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 0 40px 80px;
  animation: ${fadeUp} 0.45s 0.2s ease both;
  opacity: 0;
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const ContactText = styled.div``;
const ContactTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;
const ContactSub = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContactLinks = styled.div` display: flex; gap: 10px; `;

const ContactBtn = styled.a`
  font-size: 13px;
  font-weight: 500;
  padding: 9px 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bg};
  transition: all 150ms ease;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PrimaryContactBtn = styled(ContactBtn)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-color: ${({ theme }) => theme.colors.primary};
  &:hover { opacity: 0.88; color: #fff; }
`;

/* ── gallery CTA ── */
const GalleryCta = styled.div`
  max-width: 820px;
  margin: 0 auto 60px;
  padding: 0 40px;
  text-align: center;
`;

const CtaLink = styled(Link)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.75; }
`;

export default function AboutMe() {
  return (
    <Page>

      <HeroBand>
        <Avatar>PP</Avatar>
        <DevName>Priyanka Prajapati</DevName>
        <DevRole>Frontend Developer · React &amp; TypeScript</DevRole>
        <Bio>
          I built PawFolio as a take-home challenge to demonstrate my skills in
          React, TypeScript, and modern frontend architecture. I care deeply about
          clean code, accessible UI, and user experiences that feel effortless.
        </Bio>
      </HeroBand>

      <Body>
        <Section>
          <SectionTitle>Skills</SectionTitle>
          <Skills>
            <Skill $primary>React</Skill>
            <Skill $primary>TypeScript</Skill>
            <Skill $primary>styled-components</Skill>
            <Skill $primary>React Router</Skill>
            <Skill $primary>Javascript</Skill>
            <Skill>REST APIs</Skill>
            <Skill>Git</Skill>
            <Skill>JEST</Skill>
            <Skill>Redux Toolkit</Skill>
            <Skill>Accessibility</Skill>
          </Skills>
        </Section>

        <Section>
          <SectionTitle>What I built in this Project</SectionTitle>
          <Timeline>
            <TimelineItem>
              <TDot />
              <TContent>
                <TTitle>Custom data hook</TTitle>
                <TDesc>usePets handles loading, error, and empty states explicitly — no ambiguity.</TDesc>
              </TContent>
            </TimelineItem>
            <TimelineItem>
              <TDot />
              <TContent>
                <TTitle>Global selection state</TTitle>
                <TDesc>Context + useReducer keeps selections alive across route navigation.</TDesc>
              </TContent>
            </TimelineItem>
            <TimelineItem>
              <TDot />
              <TContent>
                <TTitle>Bulk download</TTitle>
                <TDesc>Select any number of pets and download all images in one click.</TDesc>
              </TContent>
            </TimelineItem>
            <TimelineItem>
              <TDot />
              <TContent>
                <TTitle>Responsive grid</TTitle>
                <TDesc>1 column on mobile · 2 on tablet · 4 on desktop — no layout breakage.</TDesc>
              </TContent>
            </TimelineItem>
          </Timeline>
        </Section>
      </Body>

      <FullWidth>
        <ContactCard>
          <ContactText>
            <ContactTitle>Get in touch</ContactTitle>
            <ContactSub>Open to feedback, questions, or a quick chat about the project.</ContactSub>
          </ContactText>
          <ContactLinks>
            <ContactBtn href="https://github.com/prajapati-priyanka" target="_blank">GitHub</ContactBtn>
            <ContactBtn href="https://www.linkedin.com/in/priyanka-prajapati-853098146/" target="_blank">LinkedIn</ContactBtn>
            <PrimaryContactBtn href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Email me</PrimaryContactBtn>
          </ContactLinks>
        </ContactCard>
      </FullWidth>

      <GalleryCta>
        <CtaLink to="/gallery">← Back to the gallery</CtaLink>
      </GalleryCta>

    </Page>
  );
}
