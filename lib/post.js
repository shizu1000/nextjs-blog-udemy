import path from 'path';
import fs from 'fs'
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'posts'); // process.cwd()はカレントディレクトリの意味

// mdファイルを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDir); // fileArrays
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');

        // マークダウンファイルを文字列として取得
        const fullPath = path.join(postsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}


// getStaticPathでreturnで使うPathを取得する
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDir); // fileArrays
    return fileNames.map((fileName) => {
        return {
            params : {
                id:fileName.replace(/\.md$/, ''),
            }
        }
    });
}

// idに基づいてブログ情報を返す
export async function getPostData(id) {
    const fullPath = path.join(postsDir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const blogContent = await remark().use(remarkHtml).process(matterResult.content);
    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}