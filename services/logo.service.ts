/**
 * Service to handle dynamic logo operations.
 */
export async function fetchLogos(): Promise<string[]> {
  try {
    const response = await fetch('/api/logos');
    if (!response.ok) {
      throw new Error(`Failed to fetch logos: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching logos in logo service:', error);
    return [];
  }
}
