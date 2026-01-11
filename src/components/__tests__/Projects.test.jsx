import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Projects from '../Projects';
import React from 'react';
import { projectService } from '../../services/projectService';

// Mock Language Context
const mockT = vi.fn((key) => key);
vi.mock('../../context/LanguageContext', () => ({
    useLanguage: () => ({ t: mockT }),
}));

// Mock projectService
vi.mock('../../services/projectService', () => ({
    projectService: {
        getAll: vi.fn(),
    },
}));

// Mock icons
vi.mock("react-icons/ti", () => ({
    TiLocationArrow: () => <span data-testid="arrow-icon">Arrow</span>
}));

// Mock AnimatedTitle to avoid animation issues in test
vi.mock('../AnimatedTitle', () => ({
    default: () => <div>AnimatedTitle</div>
}));

describe('Projects Component', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders default projects when backend fails', async () => {
        // Mock service failure
        projectService.getAll.mockRejectedValue(new Error('API Down'));

        render(<Projects />);

        // Wait for effect to run. 
        // We expect to see 6 items (default list)
        await waitFor(() => {
            const items = screen.getAllByRole('link'); // ProjectCard is an <a> tag
            expect(items.length).toBe(6);
            expect(items[0]).toHaveAttribute('href', 'https://github.com/RoyBuchanandev/RadarDev');
        });
    });

    it('renders projects from API when available', async () => {
        const mockData = [
            {
                id: 99,
                title_key: 'test.project.title',
                desc_key: 'test.project.desc',
                link: 'https://test.com'
            }
        ];

        // Mock service success
        projectService.getAll.mockResolvedValue(mockData);

        render(<Projects />);

        await waitFor(() => {
            const items = screen.getAllByRole('link');
            expect(items.length).toBe(1);
            expect(items[0]).toHaveAttribute('href', 'https://test.com');
        });
    });
});
