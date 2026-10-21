const scientificNames = [
    "Pilea peperomioides",
    "Monstera deliciosa",
    "Ficus microcarpa",
    "Pachira glabra",
    "Beaucarnea recurvata",
    "Dracaena trifasciata",
    "Peperomia obtusifolia",
    "Chamaedorea elegans",
    "Strelitzia nicolai",
    "Scindapsus pictus",
    "Yucca gigantea",
    "Dracaena reflexa var. angustifolia",
    "Aglaonema commutatum",
];

export async function GET(request) {
    const token = process.env.TREFLE_API_TOKEN;

    if (!token) {
        return Response.json(
            { error: "Plant API token is not configured." },
            { status: 500 }
        );
    }

    const id = new URL(request.url).searchParams.get("id");
    const plantId = Number(id);

    if (id !== null && (!Number.isInteger(plantId) || plantId < 1)) {
        return Response.json(
            { error: "Invalid plant ID." },
            { status: 400 }
        );
    }

    // Without an ID, return the catalogue. With an ID, return one species.
    const url = new URL(
        id === null
            ? "https://trefle.io/api/v1/species"
            : `https://trefle.io/api/v1/species/${plantId}`,
    );
    url.searchParams.set("token", token);

    if (id === null) {
        url.searchParams.set("filter[scientific_name]", scientificNames.join(","));
    }

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            return Response.json({ error: "Plant not found." }, { status: 404 });
        }

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