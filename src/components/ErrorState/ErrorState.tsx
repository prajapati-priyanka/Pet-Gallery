import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  max-width: 360px;
  line-height: 1.6;
`;

const RetryBtn = styled.button`
  font-size: 13px;
  font-weight: 500;
  padding: 10px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.88; }
  cursor: pointer
`;

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong.', onRetry }: Props) {
  return (
    <Wrap>
      <Icon>🐾</Icon>
      <Title>Couldn't load pets</Title>
      <Message>{message} Please check your connection and try again.</Message>
      {onRetry && <RetryBtn onClick={onRetry}>Try again</RetryBtn>}
    </Wrap>
  );
}
