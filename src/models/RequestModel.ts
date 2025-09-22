export default interface RequestModel {
    attachements: string[];
    collectionId: string;
    collectionName: string;
    course: string;
    created: string;
    id: string;
    requirements: Record<string, string>;
    status: string;
    updated: string;
    user?: string | null;
}
