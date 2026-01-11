/**
 * Service to handle Project related API calls.
 * Follows Single Responsibility Principle (SRP) by separating data fetching from UI.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const projectService = {
    /**
     * Fetches the list of projects from the backend.
     * @returns {Promise<Array>} List of projects
     * @throws {Error} If the response is not ok
     */
    getAll: async () => {
        try {
            const response = await fetch(`${API_URL}/projects`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            // Re-throw to let the component handle the fallback logic
            throw error;
        }
    }
};
