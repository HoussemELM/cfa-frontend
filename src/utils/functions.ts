import { Duration } from "@/models/Duration";

export function calculateDuration(start: string, end: string): Duration {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let diffMs = endDate.getTime() - startDate.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return minutes % 60 === 0 ? `${hours}h` : `${hours}h ${minutes % 60}m`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d`;
    
    const months = Math.floor(days / 30);
    return `${months}mo`;
}