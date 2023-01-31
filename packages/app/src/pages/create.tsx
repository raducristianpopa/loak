import { Layout } from "@/components/Layout";

export default function CreateLinkPage() {
  return (
    <Layout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="grid grid-cols-1 lg:col-span-2">
          <section aria-labelledby="main-section-title">
            <h2 className="sr-only" id="main-section-title">
              Your Links
            </h2>
            <div className="overflow-hidden rounded-lg border-4 border-accent-1 bg-black">
              <div className="p-6">
                <h2 className="font-rubik text-2xl font-medium">
                  Create new link
                </h2>
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="preview-section-title">
            <h2 className="sr-only" id="preview-section-title">
              Social Previews
            </h2>
            <div className="overflow-hidden rounded-lg border-4 border-accent-1 bg-black">
              <div className="p-6">
                <h2 className="font-rubik text-2xl font-medium">
                  Social previews
                </h2>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
