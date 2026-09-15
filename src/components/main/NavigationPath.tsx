import type { MenuItem } from "../../types/menu";
import { Fragment } from "react";

export function NavigationPath({
  navigationPath,
}: {
  navigationPath: MenuItem[] | null;
}) {
  return (
    <div className="mx-auto flex justify-center gap-4 font-bold">
      {navigationPath &&
        navigationPath.map((item, index) => (
          <Fragment key={item.id}>
            <span className="" key={item.id}>
              {item.title}
            </span>
            <span>{index < navigationPath.length - 1 && "→"}</span>
          </Fragment>
        ))}
    </div>
  );
}
