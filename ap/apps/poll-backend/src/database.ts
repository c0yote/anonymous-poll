interface Schema {
    responses: {
        id: string;
        pollId: string;
        answers: Record<string, number>;
    }[];
    series: {
        id: string;
        teamId: string;
        responseIds: string[];
    }[];
    polls: {
        id: string;
        title: string;
        description: string;
    }[];
    teams: {
        id: string;
        name: string;
    }[];
}

export async function setupDatabase() {
    const { JSONFilePreset } = await import('lowdb/node');
    return await JSONFilePreset<Schema>('db.json', {responses: [], series: [], teams: [], polls: []});
}