import { redirect } from "next/navigation";
import { fetchBookDetails } from "@/lib/actions/bookService";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const bookDetails = await fetchBookDetails(id);
  if (!bookDetails) {
    redirect("/404");
  }

  console.log("bookDetails", bookDetails);

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* SIMILAR BOOKS */}
      </div>
    </>
  );
};

// const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = (await params).id;
//
//   // Fetch data based on id
//   const [bookDetails] = await db
//     .select()
//     .from(books)
//     .where(eq(books.id, id))
//     .limit(1);
//
//   if (!bookDetails) redirect("/404");
//   console.log("bookDetails", bookDetails);
//   console.log("id", id);
//
//   return <div>Page</div>;
// };
//
export default Page;
