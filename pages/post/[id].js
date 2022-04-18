import blogApi from "../api/blogApi";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Default } from "../../componets/Default";
import react, { useEffect, useState } from "react";

const PostId = ({ post }) => {
  const item = post.post;
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = async () => {
      setLoading(true);
      let postUser = await blogApi.getSinglePost(id);
      setUser(postUser.post.user);
      setLoading(false);
    };
    getUserId();
  }, []);

  return (
    <Default>
      <Head>
        <title>{item.title}</title>
      </Head>

      <Link href="/">
        <a>Voltar para Home</a>
      </Link>

      <div className="posts">
        <h1>{item.title}</h1>
        <strong>Cetegoria: {item.category.name}</strong>
        <br />
        {item.photos.map((photo, k) => (
          <Image
            key={k}
            src={photo.url}
            alt=""
            width={720}
            height={410}
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXg8AAfMBOOg8T0oAAAAASUVORK5CYII="
          />
        ))}
        <p>{item.content}</p>
        <hr />
        <div>
          <h2>User: Name {user.name}</h2>
          {loading && <p>Carregando</p>}
          {loading === false && (
            <Image src={user.avatar} height={100} width={100} />
          )}
        </div>
      </div>
    </Default>
  );
};

export const getStaticPaths = async () => {
  const posts = await blogApi.getPosts();

  let paths = posts.posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  let post = await blogApi.getSinglePost(id);
  return {
    props: {
      post,
    },
  };
};

export default PostId;
