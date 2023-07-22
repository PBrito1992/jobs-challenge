import { TJob } from 'context/jobs-provider';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    jobs?: TJob[];
    error?: string
};

const PAGE_SIZE = 10;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const searchTerm = req.query?.searchTerm as string || "";
    const page = +(req.query?.page as string) || 0;
    const params = new URLSearchParams();
    params.set('q', searchTerm);
    params.set('start', (page * PAGE_SIZE).toString());

    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const jobsResponse = await fetch(
            `https://serpapi.com/search?engine=google_jobs&${params.toString()}&api_key=${process.env.API_KEY
            }`,
            {
                method: "GET",
                headers: headers,
            }
        ).then((resp) => resp.json());

        res.status(200).json({ jobs: jobsResponse?.jobs_results || [] });
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' });
    }
}