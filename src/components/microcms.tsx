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

async function getList(queries?: MicroCMSQueries) {
    return await client.getList<Blog>({
        endpoint: "blog",
        queries,
    })
}

async function getDetail(contentId: string,queries?: MicroCMSQueries){
    return await client.getListDetail<Blog>({
        endpoint: "blog",
        contentId,
        queries
    })
}

export async function PostsList(){
    const {contents} = await getList()
    if(!contents){
        return <h1>コンテンツないぞ</h1>
    }

    return(
        <main>
            <ul>
                {contents.map((post) => {
                    return(
                    <li>
                        <Link href={`${post.id}`}>{post.title}</Link>
                    </li>)
                })}
            </ul>
        </main>
    )
}

export async function generateStaticParams() {
    const { contents } = await getList();
   
    const paths = contents.map((post) => {
     return {
      postId: post.id,
     };
    });
   
    return [...paths];
   }
   
   export default async function StaticDetailPage({
    params: { postId },
   }: {
    params: { postId: string };
   }) {
    const post = await getDetail(postId);
   
    return (
     <div>
      <h1>{post.title}</h1>
      <div>{parse(post.body)}</div>
     </div>
    );
   }

