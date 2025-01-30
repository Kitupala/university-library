import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { asc } from "drizzle-orm";

const Page = async () => {
  const borrowedBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(asc(books.createdAt))) as Book[];

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};

export default Page;
