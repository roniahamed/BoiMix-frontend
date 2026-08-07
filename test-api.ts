import { fetchBooks } from "./lib/api-client";
async function run() {
  const books = await fetchBooks();
  console.log(
    books.results
      .slice(0, 3)
      .map((b: any) => ({ title: b.title, distance: b.distance })),
  );
}
run();
