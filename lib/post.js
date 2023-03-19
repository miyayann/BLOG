import matter from "gray-matter";
import path from "path"
import fs from "fs";
import html from "remark-html";
import { remark } from "remark";

const postsDirectory = path.join(process.cwd(), "posts")
console.log(postsDirectory)


//mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/,"");// ファイル名ID

    // マークダウンファイルを文字列として読み込む
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    //idとデータを返す
    return {
      id,
      ...matterResult.data
    }
  })
  return allPostData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  /*
[
  {
    params: {
      id: "ssg-ssr"
    }
  },
  {
    params: {
      id: "next-react"
    }
  }
]*/
}

//idに基づいてぬログ投稿内容を返す
export async function getPostData(id) {

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContent);
  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHtml = blogContent.toString();

  return {
    id,
    blogContentHtml,
    ...matterResult.data
  };
}
