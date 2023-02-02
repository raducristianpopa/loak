import { Layout } from "@/components/Layout";
import { Button } from "@/ui/Button";
import { Form, useZodForm } from "@/ui/Form";
import { Input } from "@/ui/Input";
import { z } from "zod";

const newLinkSchema = z.object({
  destination: z.string().url({ message: "Invalid URL" }),
  key: z
    .string()
    .min(2, { message: "Key must be at least 3 characters long." }),
});

export default function CreateLinkPage() {
  const form = useZodForm({
    schema: newLinkSchema,
  });

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
                <Form form={form} onSubmit={() => void 0} className="mt-5">
                  <Input
                    type="url"
                    label="Destination URL"
                    placeholder="https://github.com/raducristianpopa/loak"
                    error={form.formState.errors.destination?.message}
                    {...form.register("destination")}
                  />
                  <div className="flex items-center justify-between space-x-4">
                    <Input
                      label="Short URL key"
                      placeholder="https://github.com/raducristianpopa/loak"
                      error={form.formState.errors.key?.message}
                      addOn="loak.top/"
                      fullWidth
                      {...form.register("key")}
                      spellCheck={false}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      intent="primary"
                      type="submit"
                      aria-label="create link"
                      className="ml-auto"
                    >
                      Create link
                    </Button>
                  </div>
                </Form>
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
