import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }) => <p {...props}>{children}</p>,
        span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }) => children,
}));

// Mock react-type-animation
jest.mock('react-type-animation', () => ({
    TypeAnimation: () => <div>Type Animation</div>,
}));

test('renders Hero component with name', () => {
    render(<Hero />);
    const nameElement = screen.getByText(/Rohon/i);
    expect(nameElement).toBeInTheDocument();
});