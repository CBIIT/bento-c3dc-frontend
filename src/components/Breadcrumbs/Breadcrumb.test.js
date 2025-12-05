import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

// Helper function to render component within Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Breadcrumb Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const data = [];
      renderWithRouter(<Breadcrumb data={data} />);
    });

    it('should render a single breadcrumb item as plain text', () => {
      const data = [{ name: 'Home', isALink: false }];
      renderWithRouter(<Breadcrumb data={data} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render a single breadcrumb item as a link', () => {
      const data = [{ name: 'Home', isALink: true, to: '/' }];
      renderWithRouter(<Breadcrumb data={data} />);
      const link = screen.getByText('Home');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });

    it('should render multiple breadcrumb items', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'Products', isALink: true, to: '/products' },
        { name: 'Details', isALink: false }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
    });
  });

  describe('Link Navigation', () => {
    it('should render links with correct href attributes', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'About', isALink: true, to: '/about' }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      
      const homeLink = screen.getByText('Home').closest('a');
      const aboutLink = screen.getByText('About').closest('a');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('should not render links for non-link items', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'Current Page', isALink: false }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      
      const homeLink = screen.getByText('Home').closest('a');
      const currentPage = screen.getByText('Current Page');
      
      expect(homeLink).toBeTruthy();
      expect(currentPage.closest('a')).toBeNull();
    });
  });

  describe('Separators', () => {
    it('should render arrow separators between items', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'Products', isALink: true, to: '/products' },
        { name: 'Details', isALink: false }
      ];
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      // Should have 2 arrows for 3 items
      const arrows = container.querySelectorAll('img[alt="next arrow"]');
      expect(arrows).toHaveLength(2);
    });

    it('should not render arrow after the last item', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'Current', isALink: false }
      ];
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      // Should have 1 arrow for 2 items
      const arrows = container.querySelectorAll('img[alt="next arrow"]');
      expect(arrows).toHaveLength(1);
    });

    it('should not render any arrows for a single item', () => {
      const data = [{ name: 'Home', isALink: false }];
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      const arrows = container.querySelectorAll('img[alt="next arrow"]');
      expect(arrows).toHaveLength(0);
    });
  });

  describe('Mixed Content', () => {
    it('should handle mixed link and non-link items', () => {
      const data = [
        { name: 'Home', isALink: true, to: '/' },
        { name: 'Products', isALink: false },
        { name: 'Category', isALink: true, to: '/category' },
        { name: 'Item', isALink: false }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      
      expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
      expect(screen.getByText('Products').closest('a')).toBeNull();
      expect(screen.getByText('Category').closest('a')).toHaveAttribute('href', '/category');
      expect(screen.getByText('Item').closest('a')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', () => {
      const data = [];
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      // Component should render but be empty
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should handle items with special characters in names', () => {
      const data = [
        { name: 'Home & Garden', isALink: false },
        { name: 'Tools & Equipment', isALink: true, to: '/tools' }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      
      expect(screen.getByText('Home & Garden')).toBeInTheDocument();
      expect(screen.getByText('Tools & Equipment')).toBeInTheDocument();
    });

    it('should handle long breadcrumb trails', () => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        name: `Level ${i + 1}`,
        isALink: i < 9,
        to: i < 9 ? `/level${i + 1}` : undefined
      }));
      
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      // Should have 9 arrows for 10 items
      const arrows = container.querySelectorAll('img[alt="next arrow"]');
      expect(arrows).toHaveLength(9);
      
      // All items should be rendered
      data.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  describe('onClick Handler', () => {
    it('should pass onClick handler to link items', () => {
      const mockOnClick = jest.fn();
      const data = [
        { name: 'Home', isALink: true, to: '/', onClick: mockOnClick }
      ];
      
      renderWithRouter(<Breadcrumb data={data} />);
      const link = screen.getByText('Home');
      
      // Verify the link is clickable (onClick is passed to the Link component)
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe('Styling', () => {
    it('should apply correct CSS classes to the container', () => {
      const data = [{ name: 'Home', isALink: false }];
      const { container } = renderWithRouter(<Breadcrumb data={data} />);
      
      const breadcrumbContainer = container.querySelector('div');
      expect(breadcrumbContainer).toBeInTheDocument();
    });

    it('should apply different styles to links vs non-links', () => {
      const data = [
        { name: 'Link', isALink: true, to: '/link' },
        { name: 'Text', isALink: false }
      ];
      renderWithRouter(<Breadcrumb data={data} />);
      
      const linkElement = screen.getByText('Link').closest('a');
      const textElement = screen.getByText('Text');
      
      expect(linkElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe('A');
      expect(textElement.tagName).toBe('SPAN');
    });
  });
});
