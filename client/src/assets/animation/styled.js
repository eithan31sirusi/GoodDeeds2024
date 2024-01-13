import styled, { keyframes } from "styled-components";

// Animation keyframes to draw and undraw the heart

// Styled component for the loader

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(
    40,
    60,
    80,
    0.85
  ); // Dark bluish background with some opacity
  z-index: 999; // High z-index to ensure it's above other content
  svg {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    pointer-events: none;
    animation: animateDash 2s linear forwards infinite;
  }
  @keyframes animateDash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;
