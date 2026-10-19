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
            `https://trefle.io/api/v1/species?token=${token}&filter[scientific_name]=Pilea%20peperomioides,Monstera%20deliciosa,Ficus%20microcarpa,Pachira%20glabra,Beaucarnea%20recurvata,Dracaena%20trifasciata,Peperomia%20obtusifolia,Chamaedorea%20elegans,Strelitzia%20nicolai,Scindapsus%20pictus,Yucca%20gigantea,Dracaena%20reflexa%20var.%20angustifolia,Aglaonema%20commutatum`
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