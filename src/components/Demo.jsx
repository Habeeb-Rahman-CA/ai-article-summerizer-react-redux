import { useEffect, useState } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updateAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updateAllArticles);
      localStorage.setItem("articles", JSON.stringify(updateAllArticles));
    }
  };
  return (
    <section>
      <div className="mt-20 flex items-center justify-center">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="border-2 border-slate-200 p-2 w-[400px] rounded-l-2xl"
          />
          <button
            type="submit"
            className="border-2 px-4 border-slate-200 p-2 rounded-r-2xl"
          >
            Summarize
          </button>
        </form>
      </div>
        <div className="mt-8 w-full items-center justify-start text-left">
          <h1 className="text-2xl font-semibold">
            Article <span className="text-blue-500">Summary</span>
          </h1>
          <p>{article.summary}</p>
        </div>
    </section>
  );
};

export default Demo;
