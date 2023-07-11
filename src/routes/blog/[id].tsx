import parse from "html-react-parser";
import { getList, getDetail } from "~/components/microcms";

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
