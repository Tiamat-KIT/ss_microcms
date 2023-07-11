import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSDate,
} from "microcms-js-sdk";
import { Link } from "solid-start";
import parse from "html-react-parser";

type Blog = {
    id: string,
    title: string,
    body: string,
} & MicroCMSDate

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
})

export async function getList(queries?: MicroCMSQueries) {
    return await client.getList<Blog>({
        endpoint: "blog",
        queries,
    })
}

export async function getDetail(contentId: string,queries?: MicroCMSQueries){
    return await client.getListDetail<Blog>({
        endpoint: "blog",
        contentId,
        queries
    })
}


