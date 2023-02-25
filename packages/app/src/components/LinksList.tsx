import { Link } from "@/ui/Link";
import { gql, useQuery } from "@apollo/client";
import { cx } from "class-variance-authority";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { GetLinksQuery } from "./__generated__/LinksList.generated";

dayjs.extend(relativeTime);

const getLinksQuery = gql`
  query GetLinksQuery {
    links {
      edges {
        node {
          id
          key
          domain
          targetUrl
          archived
          createdAt
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

export const LinksList = () => {
  const { data } = useQuery<GetLinksQuery>(getLinksQuery);

  return (
    <div className="overflow-hidden shadow sm:rounded-md">
      <ul className="divide-y-2 divide-accent-1">
        {data?.links?.edges &&
          data.links?.edges?.map((link) => (
            <li key={link.node.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium text-white hover:underline ">
                    <Link href={`https://${link.node.domain}/${link.node.key}`}>
                      {link.node.domain}/{link.node.key}
                    </Link>
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p
                      className={cx(
                        link.node.archived
                          ? "bg-orange-200 text-orange-800"
                          : "bg-green-200 text-green-800",
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                      )}
                    >
                      {link.node.archived ? "ARCHIVED" : "ACTIVE"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center space-x-1 font-extralight">
                      <span>Target: </span>
                      <Link
                        className="hover:underline"
                        href={link.node.targetUrl}
                      >
                        {link.node.targetUrl}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Created {dayjs(link.node.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
