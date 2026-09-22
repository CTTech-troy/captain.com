import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ?
              <span aria-current="page" className="text-forest-700">
                  {item.name}
                </span> :

              <>
                  <Link to={item.path} className="link-underline transition-colors hover:text-ink">
                    {item.name}
                  </Link>
                  <ChevronRightIcon className="h-3 w-3 text-faint" aria-hidden="true" />
                </>
              }
            </li>);

        })}
      </ol>
    </nav>);

}