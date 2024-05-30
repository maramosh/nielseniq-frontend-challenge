import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  min-width: 150px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 16px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: rotateY(180deg);
  }

  @media (max-width: 760px) {
    min-width: 40vw;
    height: 200px;
  }

  @media (min-width: 1024px) {
    min-width: 220px;
    height: 300px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  ${CardContainer}:hover & {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardBackContent = styled.div`
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CardBack = styled(CardFace)`
  background: #fff;
  color: #333;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  transform: rotateY(180deg);
`;

const CardImage = styled.img`
  width: 100%;
  height: 70%;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
`

const CardAction = styled.p`
  font-size: 14px;
  color: #2C6EF9;
  font-weight: bold;
  text-align: center;
`

const Card = ({ title, thumbnailUrl, description, onClick }) => {

  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  }

  return (
    <CardContainer data-testid="card-component" onClick={onClick}>
      <CardInner>
        <CardFace>
          <CardImage src={imageError || isLoading ? '/error-image-generic.png' : thumbnailUrl} alt={title} onError={handleImageError} onLoad={handleImageLoad} />
          <CardTitle>{`${title.length > 15 ? `${title.slice(0, 15)}...` : title}`}</CardTitle>
        </CardFace>
        <CardBack>
          <CardBackContent>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description ?? 'No description yet'}</CardDescription>
            <CardAction>{description ? 'Click to edit description' : 'Click to add description'}</CardAction>
          </CardBackContent>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
}

export default Card;