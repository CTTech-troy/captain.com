import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowUpRightIcon } from 'lucide-react';
import { CtrotechSymbol } from '../brand/CtrotechSymbol';
import { footerColumns } from '../../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white text-forest-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-page pb-10 pt-20 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Ctrotech.com home" className="inline-flex items-center gap-3 text-forest-800">
              <CtrotechSymbol size={44} />
              <span className="font-display text-4xl font-semibold tracking-[-0.04em] text-forest-900">
                Ctrotech<span className="text-forest-600">.com</span>
              </span>
            </Link>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl font-medium tracking-[-0.02em] text-forest-800">
              Software<span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />
              Security<span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />
              Intelligence
            </p>
            <Link
              to="/contact"
              data-cursor="open"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-lemon px-5 py-3 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-lemon-300">
              
              Start a project
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerColumns.map((column) =>
            <nav key={column.title} aria-label={column.title}>
                <h3 className="label-mono text-forest-600">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) =>
                <li key={link.label}>
                      <Link to={link.to} className="link-underline text-[14px] text-forest-900 transition-colors hover:text-forest-600">
                        {link.label}
                      </Link>
                    </li>
                )}
                </ul>
              </nav>
            )}
            <nav aria-label="Contact">
<h3 className="label-mono text-forest-600">Contact</h3>
<a href="mailto:support@ctrotech.com" className="mt-5 inline-block break-all text-[14px] text-forest-900 underline-offset-4 hover:underline">support@ctrotech.com</a>
</nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-forest-800/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ctrotech.com. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.14em] text-forest-800 sm:self-auto">
            
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-colors duration-200 group-hover:border-forest-800 group-hover:bg-lemon">
              <ArrowUpIcon className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>);

}