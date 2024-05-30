import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default GridContainer;
