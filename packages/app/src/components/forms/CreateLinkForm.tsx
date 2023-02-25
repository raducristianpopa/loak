import { Button } from "@/ui/Button";
import { ErrorPanel } from "@/ui/ErrorPanel";
import { Form, useZodForm } from "@/ui/Form";
import { Input } from "@/ui/Input";
import { gql, useMutation } from "@apollo/client";
import { z } from "zod";

const newLinkSchema = z.object({
  target: z.string().url({ message: "Invalid URL" }),
  key: z
    .string()
    .min(3, { message: "Key must be at least 3 characters long." }),
});

const CreateLinkForm = () => {
  const form = useZodForm({
    schema: newLinkSchema,
  });

  const [createLink, { data, error }] = useMutation(gql`
    mutation CreateLinkMutation($input: CreateLinkInput!) {
      createLink(input: $input) {
        id
        domain
        key
        targetUrl
      }
    }
  `);

  const handleSubmit = form.handleSubmit(({ target, key }) => {
    createLink({ variables: { input: { key, target } } });
    console.log(data);
  });

  return (
    <>
      {error && (
        <ErrorPanel message="Please make sure all fields are filled correctly!" />
      )}
      <Form form={form} onSubmit={handleSubmit} className="mt-5">
        <Input
          // type="url"
          label="Destination URL"
          placeholder="https://github.com/raducristianpopa/loak"
          error={form.formState.errors.target?.message}
          {...form.register("target")}
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
    </>
  );
};

export default CreateLinkForm;
