import { Link } from "solid-start"
import { getList } from "~/components/microcms"

export default async function Blog(){
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
                        <Link href={`./blog/${post.id}`}>{post.title}</Link>
                    </li>
                    )
                })}
            </ul>
        </main>
    )
}