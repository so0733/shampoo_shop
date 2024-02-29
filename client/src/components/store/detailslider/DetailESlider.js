import React, { useState } from 'react';
import styled from 'styled-components';

import detailimg from '../../../img/store/mainimg/e_essence.jpg';
import detailimg1 from '../../../img/store/detailimg/e_essence1.jpg';
import detailimg2 from '../../../img/store/detailimg/e_essence2.jpg';
import detailimg3 from '../../../img/store/detailimg/e_essence3.jpg';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LargeImage = styled.img`
  padding: 10px;
  height: 400px;
  width: 400px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ThumbnailImage = styled.img`
  margin: 10px;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

function DetailESlider() {
  const [currentImage, setCurrentImage] = useState(detailimg);

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <DetailContainer>
      <LargeImage src={currentImage} alt="Large Image" />
      
      <ThumbnailContainer>
        <ThumbnailImage
          src={detailimg1}
          alt="Thumbnail 1"
          onClick={() => handleThumbnailClick(detailimg1)}
        />
        <ThumbnailImage
          src={detailimg2}
          alt="Thumbnail 2"
          onClick={() => handleThumbnailClick(detailimg2)}
        />
        <ThumbnailImage
          src={detailimg3}
          alt="Thumbnail 3"
          onClick={() => handleThumbnailClick(detailimg3)}
        />
      </ThumbnailContainer>
    </DetailContainer>
  );
};

export default DetailESlider;
