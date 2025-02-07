import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Img from './index';

describe('Img Component', () => {
  const src = 'valid-image-src.jpg';
  const alt = 'Test Image';
  const fallbackSrc = 'fallback-image-src.jpg';
  const className = 'test-class';
test('renders with the correct src and alt attributes', () => {
    render(<Img src={src} alt={alt} fallbackSrc={fallbackSrc} className={className}  />);
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toHaveAttribute('src', src);
    expect(imgElement).toHaveAttribute('alt', alt);
    expect(imgElement).toHaveClass(className);
  });
test('renders with fallback src on error', () => {
    render(<Img src={src} alt={alt} fallbackSrc={fallbackSrc} className={className} />);
    const imgElement = screen.getByAltText(alt);
    fireEvent.error(imgElement);
    expect(imgElement).toHaveAttribute('src', fallbackSrc);
  });
});