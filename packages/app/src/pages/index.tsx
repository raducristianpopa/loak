import { Layout } from "@/components/Layout";
import { LinksList } from "@/components/LinksList";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="grid grid-cols-1 lg:col-span-3">
          <section aria-labelledby="main-section-title">
            <h2 className="sr-only" id="main-section-title">
              Your Links
            </h2>
            <div className="overflow-hidden rounded-lg border-4 border-accent-1 bg-black">
              <LinksList />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
