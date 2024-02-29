import React from 'react';
import styled from 'styled-components';

const HashtagSpan = styled.span`
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 20px;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? '#8FB8B2' : 'transparent')};
    color: ${({ selected }) => (selected ? '#ffffff' : '#8FB8B2')};
`;

const Hashtag = ({ tag, selected, onClick }) => {
    return (
        <HashtagSpan selected={selected} onClick={() => onClick(tag)}>
            {tag}
        </HashtagSpan>
    );
};

export default Hashtag;
