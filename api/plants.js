export async function GET() {
    const token = process.env.TREFLE_API_TOKEN;

    if (!token) {
        return Response.json(
            { error: "Plant API token is not configured." },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://trefle.io/api/v1/plants/search?token=${token}&q=monstera`
        );

        if (!response.ok) {
            return Response.json(
                { error: `Failed to fetch plants (HTTP ${response.status}).` },
                { status: 502 }
            );
        }

        const data = await response.json();

        return Response.json({ data: data.data });
    } catch {
        return Response.json(
            { error: "Unable to connect to the plant API." },
            { status: 502 }
        );
    }
}